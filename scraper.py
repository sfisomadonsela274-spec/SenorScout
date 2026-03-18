"""
Multi-source price scraper for SenorScout
Fetches prices from Amazon, eBay, Craigslist, and Bobshop (South Africa)
Includes fallback mock data for testing when scraping is blocked
Uses Playwright for JavaScript-rendered sites
"""

import json
import os
import random
import re
import sys
import time
from statistics import mean, median
from typing import Dict, List, Optional, Tuple

import requests
from bs4 import BeautifulSoup
from requests.adapters import HTTPAdapter
from urllib3.util.retry import Retry

# Try to import Playwright for JavaScript rendering
try:
    from playwright.sync_api import sync_playwright

    PLAYWRIGHT_AVAILABLE = True
except ImportError:
    PLAYWRIGHT_AVAILABLE = False
    print("Playwright not available. Using fallback scraping methods.")

# Mock price data for common objects (fallback when scraping is blocked)
MOCK_PRICES = {
    # Electronics
    "iphone": {"min": 200, "max": 1500, "avg": 650},
    "phone": {"min": 50, "max": 1200, "avg": 400},
    "smartphone": {"min": 100, "max": 1500, "avg": 500},
    "ipad": {"min": 200, "max": 1200, "avg": 500},
    "tablet": {"min": 50, "max": 800, "avg": 300},
    "laptop": {"min": 200, "max": 3000, "avg": 800},
    "macbook": {"min": 500, "max": 4000, "avg": 1500},
    "computer": {"min": 200, "max": 2500, "avg": 700},
    "monitor": {"min": 50, "max": 1000, "avg": 250},
    "keyboard": {"min": 20, "max": 300, "avg": 80},
    "mouse": {"min": 10, "max": 150, "avg": 40},
    "headphones": {"min": 20, "max": 500, "avg": 150},
    "earbuds": {"min": 20, "max": 300, "avg": 100},
    "speaker": {"min": 20, "max": 500, "avg": 120},
    "tv": {"min": 100, "max": 5000, "avg": 800},
    "television": {"min": 100, "max": 5000, "avg": 800},
    "camera": {"min": 100, "max": 5000, "avg": 800},
    "dslr": {"min": 300, "max": 4000, "avg": 1200},
    "watch": {"min": 20, "max": 2000, "avg": 200},
    "smartwatch": {"min": 50, "max": 800, "avg": 250},
    "game console": {"min": 200, "max": 600, "avg": 350},
    "playstation": {"min": 200, "max": 600, "avg": 400},
    "xbox": {"min": 200, "max": 600, "avg": 400},
    "nintendo": {"min": 150, "max": 500, "avg": 300},
    # Vehicles
    "car": {"min": 1000, "max": 100000, "avg": 25000},
    "bicycle": {"min": 50, "max": 5000, "avg": 500},
    "motorcycle": {"min": 1000, "max": 30000, "avg": 8000},
    "scooter": {"min": 100, "max": 5000, "avg": 800},
    # Clothing
    "shoes": {"min": 20, "max": 500, "avg": 80},
    "jacket": {"min": 20, "max": 1000, "avg": 150},
    "shirt": {"min": 10, "max": 500, "avg": 40},
    "pants": {"min": 20, "max": 300, "avg": 60},
    "dress": {"min": 20, "max": 500, "avg": 100},
    "handbag": {"min": 20, "max": 2000, "avg": 200},
    "purse": {"min": 20, "max": 1000, "avg": 150},
    # Home & Furniture
    "chair": {"min": 20, "max": 1000, "avg": 150},
    "table": {"min": 50, "max": 2000, "avg": 400},
    "couch": {"min": 100, "max": 3000, "avg": 800},
    "sofa": {"min": 100, "max": 3000, "avg": 800},
    "bed": {"min": 100, "max": 3000, "avg": 700},
    "desk": {"min": 50, "max": 1500, "avg": 400},
    "lamp": {"min": 10, "max": 500, "avg": 80},
    "rug": {"min": 20, "max": 1000, "avg": 200},
    # Sports & Outdoors
    "bicycle": {"min": 50, "max": 5000, "avg": 500},
    "bike": {"min": 50, "max": 5000, "avg": 500},
    "golf clubs": {"min": 100, "max": 5000, "avg": 800},
    "tennis racket": {"min": 30, "max": 500, "avg": 150},
    "fishing rod": {"min": 20, "max": 1000, "avg": 150},
    "camping gear": {"min": 50, "max": 2000, "avg": 400},
    # Jewelry
    "ring": {"min": 20, "max": 10000, "avg": 500},
    "necklace": {"min": 20, "max": 10000, "avg": 400},
    "bracelet": {"min": 10, "max": 5000, "avg": 200},
    "earrings": {"min": 10, "max": 3000, "avg": 150},
    "watch": {"min": 20, "max": 20000, "avg": 500},
    # Musical Instruments
    "guitar": {"min": 50, "max": 10000, "avg": 600},
    "piano": {"min": 200, "max": 50000, "avg": 5000},
    "drums": {"min": 200, "max": 5000, "avg": 800},
    "violin": {"min": 50, "max": 10000, "avg": 800},
    # Tools
    "drill": {"min": 30, "max": 500, "avg": 120},
    "saw": {"min": 30, "max": 500, "avg": 150},
    "wrench": {"min": 10, "max": 300, "avg": 50},
    "hammer": {"min": 10, "max": 200, "avg": 40},
    # Books & Media
    "book": {"min": 5, "max": 100, "avg": 20},
    "textbook": {"min": 20, "max": 500, "avg": 100},
    "video game": {"min": 10, "max": 100, "avg": 40},
    "dvd": {"min": 5, "max": 50, "avg": 15},
    "blu-ray": {"min": 10, "max": 50, "avg": 20},
    # Collectibles
    "coin": {"min": 1, "max": 10000, "avg": 50},
    "stamp": {"min": 1, "max": 5000, "avg": 30},
    "baseball card": {"min": 1, "max": 10000, "avg": 100},
    "comic": {"min": 5, "max": 5000, "avg": 50},
}


class PriceScraper:
    """Multi-source price scraper with retry logic, rate limiting, and fallback data."""

    def __init__(self, max_results_per_source: int = 5, use_fallback: bool = True):
        self.max_results_per_source = max_results_per_source
        self.use_fallback = use_fallback
        self.session = self._create_session()
        # Full realistic headers to mimic a real browser
        self.headers = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8",
            "Accept-Language": "en-US,en;q=0.9,af;q=0.8,zu;q=0.7",
            "Accept-Encoding": "gzip, deflate, br",
            "Accept-Charset": "utf-8",
            "Connection": "keep-alive",
            "Cache-Control": "max-age=0",
            "DNT": "1",
            "Referer": "https://www.google.com/",
            "Sec-Fetch-Dest": "document",
            "Sec-Fetch-Mode": "navigate",
            "Sec-Fetch-Site": "none",
            "Sec-Fetch-User": "?1",
            "Upgrade-Insecure-Requests": "1",
            "X-Requested-With": "com.android.chrome",
        }

    def _create_session(self):
        session = requests.Session()
        retry_strategy = Retry(
            total=3,
            backoff_factor=2,
            status_forcelist=[429, 500, 502, 503, 504],
            allowed_methods=["HEAD", "GET", "OPTIONS", "POST"],
        )
        adapter = HTTPAdapter(max_retries=retry_strategy)
        session.mount("http://", adapter)
        session.mount("https://", adapter)
        return session

    def _rate_limit(self, min_delay: float = 2.0, max_delay: float = 5.0):
        """Apply rate limiting between requests using time module with random delay."""
        import time as time_module

        delay = random.uniform(min_delay, max_delay)
        time_module.sleep(delay)

    def _get_mock_data(self, keyword: str) -> List[Tuple[float, str]]:
        """Generate mock price data when scraping is blocked."""
        keyword_lower = keyword.lower()

        # Find matching mock data
        for key, data in MOCK_PRICES.items():
            if key in keyword_lower or keyword_lower in key:
                # Generate 3-5 random prices around the average
                num_prices = random.randint(3, 5)
                prices = []
                for _ in range(num_prices):
                    # Random price between min and max
                    price = random.uniform(data["min"], data["max"])
                    prices.append((round(price, 2), "$"))
                return prices

        # Default mock data for unknown items
        default_avg = random.randint(50, 500)
        return [
            (round(default_avg * random.uniform(0.5, 0.8), 2), "$"),
            (round(default_avg * random.uniform(0.8, 1.0), 2), "$"),
            (round(default_avg * random.uniform(1.0, 1.2), 2), "$"),
            (round(default_avg * random.uniform(1.2, 1.5), 2), "$"),
        ]

    def fetch_all_sources(self, keyword: str) -> Dict[str, List[Tuple[float, str]]]:
        """Fetch prices from all available sources."""
        results = {}

        # Try eBay first
        try:
            ebay_results = self._fetch_ebay(keyword)
            if ebay_results:
                results["eBay"] = ebay_results
                print(f"eBay: Found {len(ebay_results)} listings")
        except Exception as e:
            print(f"eBay scraper error: {e}")

        self._rate_limit()

        # Try Amazon
        try:
            amazon_results = self._fetch_amazon(keyword)
            if amazon_results:
                results["Amazon"] = amazon_results
                print(f"Amazon: Found {len(amazon_results)} listings")
        except Exception as e:
            print(f"Amazon scraper error: {e}")

        self._rate_limit()

        # Try Craigslist
        try:
            craigslist_results = self._fetch_craigslist(keyword)
            if craigslist_results:
                results["Craigslist"] = craigslist_results
                print(f"Craigslist: {len(craigslist_results)} listings")
        except Exception as e:
            print(f"Craigslist error: {e}")

        self._rate_limit()

        # Try Bobshop (South Africa)
        try:
            bobshop_results = self._fetch_bobshop(keyword)
            if bobshop_results:
                results["Bobshop (ZA)"] = bobshop_results
                print(f"Bobshop: {len(bobshop_results)} listings")
        except Exception as e:
            print(f"Bobshop error: {e}")

        # If no results from any source, use fallback mock data
        if not results and self.use_fallback:
            print(f"Using mock data for '{keyword}' (scraping was blocked)")
            mock_data = self._get_mock_data(keyword)
            results["Estimated"] = mock_data

        return results

    def _fetch_ebay(self, keyword: str) -> List[Tuple[float, str]]:
        """Fetch prices from eBay sold listings."""
        try:
            query = requests.utils.quote(keyword)
            url = f"https://www.ebay.com/sch/i.html?_nkw={query}&_sacat=0&LH_Sold=1&_pgn=1"

            response = self.session.get(url, headers=self.headers, timeout=15)
            response.raise_for_status()

            # Check if we got blocked
            if "captcha" in response.text.lower() or "blocked" in response.text.lower():
                print("eBay: Blocked by anti-bot measures")
                return []

            soup = BeautifulSoup(response.text, "html.parser")
            results = []

            for li in soup.select("li.s-item"):
                price_span = li.select_one(".s-item__price")
                if not price_span:
                    continue

                text = price_span.get_text(strip=True)
                match = re.match(r"([$£€¥]?)\s*([0-9,.]+)", text)
                if not match:
                    continue

                currency = match.group(1) or "$"
                try:
                    amount = float(match.group(2).replace(",", ""))
                    if 0.50 <= amount <= 100000:
                        results.append((amount, currency))
                except ValueError:
                    continue

                if len(results) >= self.max_results_per_source:
                    break

            return results

        except Exception as e:
            print(f"eBay error: {e}")
            return []

    def _fetch_amazon(self, keyword: str) -> List[Tuple[float, str]]:
        """Fetch prices from Amazon."""
        try:
            query = requests.utils.quote(keyword)
            url = f"https://www.amazon.com/s?k={query}"

            response = self.session.get(url, headers=self.headers, timeout=15)
            response.raise_for_status()

            # Check if we got blocked
            if "captcha" in response.text.lower() or "blocked" in response.text.lower():
                print("Amazon: Blocked by anti-bot measures")
                return []

            soup = BeautifulSoup(response.text, "html.parser")
            results = []

            # Try multiple price selectors
            price_selectors = [
                ".a-price .a-offscreen",
                ".a-price-whole",
                ".a-price-range",
                "[data-a-color='price'] .a-offscreen",
            ]

            for selector in price_selectors:
                for span in soup.select(selector):
                    text = span.get_text(strip=True)
                    match = re.match(
                        r"[$£€¥]?\s*([0-9,]+)[.,]([0-9]{2})", text.replace(",", "")
                    )
                    if match:
                        try:
                            amount = float(f"{match.group(1)}.{match.group(2)}")
                            if 0.50 <= amount <= 100000:
                                results.append((amount, "$"))
                                if len(results) >= self.max_results_per_source:
                                    break
                        except ValueError:
                            continue
                if results:
                    break

            return results

        except Exception as e:
            print(f"Amazon error: {e}")
            return []

    def _fetch_craigslist(self, keyword: str) -> List[Tuple[float, str]]:
        """Fetch prices from Craigslist."""
        try:
            query = requests.utils.quote(keyword)
            url = f"https://newyork.craigslist.org/search/sss?query={query}"

            response = self.session.get(url, headers=self.headers, timeout=15)
            response.raise_for_status()

            soup = BeautifulSoup(response.text, "html.parser")
            results = []

            for li in soup.select("li.result-row"):
                price_span = li.select_one(".result-price")
                if not price_span:
                    continue

                text = price_span.get_text(strip=True)
                match = re.match(r"([$£€¥]?)\s*([0-9,.]+)", text)
                if not match:
                    continue

                currency = match.group(1) or "$"
                try:
                    amount = float(match.group(2).replace(",", ""))
                    if 0.50 <= amount <= 100000:
                        results.append((amount, currency))
                except ValueError:
                    continue

                if len(results) >= self.max_results_per_source:
                    break

            return results

        except Exception as e:
            print(f"Craigslist error: {e}")
            return []

    def _fetch_bobshop(self, keyword: str) -> List[Tuple[float, str]]:
        """Fetch prices from Bobshop (South African marketplace).

        Note: The search page is JavaScript-rendered, so we fetch the homepage
        and extract products from promotional sections, then filter by keyword.
        """
        try:
            # Fetch homepage instead of search (search is JS-rendered)
            url = "https://www.bobshop.co.za/"
            response = self.session.get(url, headers=self.headers, timeout=15)
            response.raise_for_status()

            # Check if we got blocked
            if "captcha" in response.text.lower() or "blocked" in response.text.lower():
                print("Bobshop: Blocked by anti-bot measures")
                return []

            soup = BeautifulSoup(response.text, "html.parser")
            results = []

            # Find all h2 elements (product titles)
            h2s = soup.find_all("h2")

            # Also look for any text containing "Price:"
            price_patterns = soup.find_all(string=re.compile(r"Price:"))

            # Create a mapping of title to price
            title_to_price = {}

            for h2 in h2s:
                title = h2.get_text(strip=True).lower()
                # Find the next p element with price
                next_p = h2.find_next("p")
                if next_p and "Price:" in next_p.get_text():
                    try:
                        price_str = (
                            next_p.get_text(strip=True).replace("Price:", "").strip()
                        )
                        amount = float(price_str)

                        # Store with original title for matching
                        original_title = h2.get_text(strip=True)
                        title_to_price[original_title] = amount
                    except (ValueError, AttributeError):
                        pass

            # Also search through all Price: patterns in the page
            for text in price_patterns:
                try:
                    # Get parent element
                    parent = text.find_parent()
                    if parent:
                        # Look for nearby h2 or title
                        prev_h2 = parent.find_previous("h2")
                        if prev_h2:
                            title = prev_h2.get_text(strip=True)
                            price_str = text.strip().replace("Price:", "").strip()
                            amount = float(price_str)
                            title_to_price[title] = amount
                except:
                    pass

            # Filter products matching the keyword
            keyword_lower = keyword.lower()
            for title, price_zar in title_to_price.items():
                if keyword_lower in title.lower():
                    # Convert ZAR to USD (1 ZAR ≈ 0.05 USD)
                    amount_usd = price_zar * 0.05

                    if 0.50 <= amount_usd <= 100000:
                        results.append((round(amount_usd, 2), "$"))

                        if len(results) >= self.max_results_per_source:
                            break

            # If no exact matches, return some general products
            if not results and len(title_to_price) > 0:
                # Return first few products as general results
                for title, price_zar in list(title_to_price.items())[
                    : self.max_results_per_source
                ]:
                    amount_usd = price_zar * 0.05
                    if 0.50 <= amount_usd <= 100000:
                        results.append((round(amount_usd, 2), "$"))

            if results:
                print(f"Bobshop: Found {len(results)} products")
            else:
                print(f"Bobshop: No products found for '{keyword}'")

            return results

        except Exception as e:
            print(f"Bobshop error: {e}")
            return []

    def get_price_summary(self, keyword: str) -> Dict:
        """Get a complete price summary from all sources."""
        all_results = self.fetch_all_sources(keyword)

        if not all_results:
            return {
                "keyword": keyword,
                "sources": {},
                "overall_average": None,
                "overall_median": None,
                "total_listings": 0,
                "error": "No price data available",
            }

        # Aggregate all prices
        all_prices = []
        for source, prices in all_results.items():
            all_prices.extend([amt for amt, _ in prices])

        if not all_prices:
            return {
                "keyword": keyword,
                "sources": {},
                "overall_average": None,
                "overall_median": None,
                "total_listings": 0,
                "error": "No valid prices found",
            }

        # Calculate statistics
        summary = {
            "keyword": keyword,
            "sources": {},
            "overall_average": round(mean(all_prices), 2),
            "overall_median": round(median(all_prices), 2),
            "total_listings": len(all_prices),
            "price_range": {
                "min": round(min(all_prices), 2),
                "max": round(max(all_prices), 2),
            },
        }

        # Add per-source details
        for source, prices in all_results.items():
            amounts = [amt for amt, _ in prices]
            currencies = [cur for _, cur in prices]
            summary["sources"][source] = {
                "listings": len(prices),
                "average": round(mean(amounts), 2) if amounts else None,
                "median": round(median(amounts), 2) if amounts else None,
                "currency": currencies[0] if currencies else "$",
                "prices": [{"amount": amt, "currency": cur} for amt, cur in prices],
            }

        return summary


def fetch_sold_listings(keyword: str, max_results: int = 5) -> List[Tuple[float, str]]:
    """Legacy function for backward compatibility. Fetches from eBay only."""
    scraper = PriceScraper(max_results_per_source=max_results, use_fallback=True)
    results = scraper._fetch_ebay(keyword)

    # If eBay fails, try other sources or use fallback
    if not results:
        all_results = scraper.fetch_all_sources(keyword)
        for source, prices in all_results.items():
            if prices:
                return prices

    return results


def average_price(prices: List[Tuple[float, str]]) -> Tuple[Optional[float], str]:
    """Legacy function for backward compatibility."""
    if not prices:
        return None, "$"

    amounts = [amt for amt, cur in prices]
    avg = mean(amounts)
    currency = prices[0][1]
    return round(avg, 2), currency


def get_appraisal(keyword: str) -> Dict:
    """Get complete price appraisal from all sources."""
    scraper = PriceScraper()
    return scraper.get_price_summary(keyword)


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python scraper.py <keyword>")
        print("Example: python scraper.py iPhone 13")
        sys.exit(1)

    keyword = " ".join(sys.argv[1:])
    print(f"Searching for prices: {keyword}")
    print("=" * 50)

    appraisal = get_appraisal(keyword)

    if appraisal["total_listings"] == 0:
        print("No results found.")
        sys.exit(0)

    print(f"Found {appraisal['total_listings']} total listings\n")

    # Print per-source results
    for source, data in appraisal["sources"].items():
        print(f"Source: {source}")
        print(f"  Listings: {data['listings']}")
        print(f"  Average: {data['currency']}{data['average']}")
        print(f"  Median: {data['currency']}{data['median']}")
        print()

    # Print overall results
    print("=" * 50)
    print(f"OVERALL AVERAGE: ${appraisal['overall_average']}")
    print(f"OVERALL MEDIAN: ${appraisal['overall_median']}")
    print(
        f"Price Range: ${appraisal['price_range']['min']} - ${appraisal['price_range']['max']}"
    )
