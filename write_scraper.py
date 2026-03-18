# Python script to generate scraper.py
import os

scraper_code = '''"""
Multi-source price scraper for SenorScout
Fetches prices from Amazon, eBay, and Craigslist
"""

import sys
import re
import time
import random
from statistics import mean, median
from typing import List, Tuple, Dict, Optional

import requests
from bs4 import BeautifulSoup
from requests.adapters import HTTPAdapter
from urllib3.util.retry import Retry


class PriceScraper:
    """Multi-source price scraper with retry logic and rate limiting."""

    def __init__(self, max_results_per_source: int = 5):
        self.max_results_per_source = max_results_per_source
        self.session = self._create_session()
        self.headers = {
            "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
            "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,*/*;q=0.8",
            "Accept-Language": "en-US,en;q=0.5",
            "Accept-Encoding": "gzip, deflate",
            "Connection": "keep-alive",
        }

    def _create_session(self):
        session = requests.Session()
        retry_strategy = Retry(total=3, backoff_factor=1, status_forcelist=[429, 500, 502, 503, 504])
        adapter = HTTPAdapter(max_retries=retry_strategy)
        session.mount("http://", adapter)
        session.mount("https://", adapter)
        return session

    def _rate_limit(self, min_delay=1.0, max_delay=3.0):
        time.sleep(random.uniform(min_delay, max_delay))

    def fetch_all_sources(self, keyword):
        results = {}
        ebay_results = self._fetch_ebay(keyword)
        if ebay_results:
            results["eBay"] = ebay_results
        self._rate_limit()
        amazon_results = self._fetch_amazon(keyword)
        if amazon_results:
            results["Amazon"] = amazon_results
        self._rate_limit()
        craigslist_results = self._fetch_craigslist(keyword)
        if craigslist_results:
            results["Craigslist"] = craigslist_results
        return results

    def _fetch_ebay(self, keyword):
        try:
            query = requests.utils.quote(keyword)
            url = f"https://www.ebay.com/sch/i.html?_nkw={query}&_sacat=0&LH_Sold=1&_pgn=1"
            response = self.session.get(url, headers=self.headers, timeout=10)
            response.raise_for_status()
            soup = BeautifulSoup(response.text, "html.parser")
            results = []
            for li in soup.select("li.s-item"):
                price_span = li.select_one(".s-item__price")
                if not price_span:
                    continue
                text = price_span.get_text(strip=True)
                match = re.match(r"([$£€¥]?)\\s*([0-9,.]+)", text)
                if not match:
                    continue
                currency = match.group(1) or "$"
                amount = float(match.group(2).replace(",", ""))
                if amount < 0.50 or amount > 100000:
                    continue
                results.append((amount, currency))
                if len(results) >= self.max_results_per_source:
                    break
            return results
        except Exception as e:
            print(f"eBay scraper error: {e}")
            return []

    def _fetch_amazon(self, keyword):
        try:
            query = requests.utils.quote(keyword)
            url = f"https://www.amazon.com/s?k={query}"
            response = self.session.get(url, headers=self.headers, timeout=10)
            response.raise_for_status()
            soup = BeautifulSoup(response.text, "html.parser")
            results = []
            for span in soup.select(".a-price-whole"):
                try:
                    whole = span.get_text(strip=True).replace(",", "")
                    fraction_span = span.find_next_sibling(".a-price-fraction")
                    fraction = fraction_span.get_text(strip=True) if fraction_span else "00"
                    amount = float(f"{whole}.{fraction}")
                    if amount < 0.50 or amount > 100000:
                        continue
                    results.append((amount, "$"))
                    if len(results) >= self.max_results_per_source:
                        break
                except (ValueError, AttributeError):
                    continue
            if not results:
                for span in soup.select(".a-offscreen"):
                    text = span.get_text(strip=True)
                    match = re.match(r"([$£€¥]?)\\s*([0-9,.]+)", text)
                    if match:
                        currency = match.group(1) or "$"
                        amount = float(match.group(2).replace(",", ""))
                        if 0.50 <= amount <= 100000:
                            results.append((amount, currency))
                            if len(results) >= self.max_results_per_source:
                                break
            return results
        except Exception as e:
            print(f"Amazon scraper error: {e}")
            return []

    def _fetch_craigslist(self, keyword):
        try:
            query = requests.utils.quote(keyword)
            url = f"https://newyork.craigslist.org/search/sss?query={query}"
            response = self.session.get(url, headers=self.headers, timeout=10)
            response.raise_for_status()
            soup = BeautifulSoup(response.text, "html.parser")
            results = []
            for li in soup.select("li.result-row"):
                price_span = li.select_one(".result-price")
                if not price_span:
                    continue
                text = price_span.get_text(strip=True)
                match = re.match(r"([$£€¥]?)\\s*([0-9,.]+)", text)
                if not match:
                    continue
                currency = match.group(1) or "$"
                amount = float(match.group(2).replace(",", ""))
                if amount < 0.50 or amount > 100000:
                    continue
                results.append((amount, currency))
                if len(results) >= self.max_results_per_source:
                    break
            return results
        except Exception as e:
            print(f"Craigslist scraper error: {e}")
            return []

    def get_price_summary(self, keyword):
        all_results = self.fetch_all_sources(keyword)
        if not all_results:
            return {
                "keyword": keyword,
                "sources": {},
                "overall_average": None,
                "overall_median": None,
                "total_listings": 0,
                "error": "No price data found"
            }
        all_prices = []
        for source, prices in all_results.items():
            all_prices.extend([amt for amt, _ in prices])
        summary = {
            "keyword": keyword,
            "sources": {},
            "overall_average": round(mean(all_prices), 2) if all_prices else None,
            "overall_median": round(median(all_prices), 2) if all_prices else None,
            "total_listings": len(all_prices),
            "price_range": {
                "min": min(all_prices) if all_prices else None,
                "max": max(all_prices) if all_prices else None
            }
        }
        for source, prices in all_results.items():
            amounts = [amt for amt, _ in prices]
            currencies = [cur for _, cur in prices]
            summary["sources"][source] = {
                "listings": len(prices),
                "average": round(mean(amounts), 2) if amounts else None,
                "median": round(median(amounts), 2) if amounts else None,
                "currency": currencies[0] if currencies else "$",
                "prices": [{"amount": amt, "currency": cur} for amt, cur in prices]
            }
        return summary


def fetch_sold_listings(keyword, max_results=5):
    """Legacy function for backward compatibility. Fetches from eBay only."""
    scraper = PriceScraper(max_results_per_source=max_results)
    return scraper._fetch_ebay(keyword)


def average_price(prices):
    """Legacy function for backward compatibility."""
    if not prices:
        return None, "$"
    amounts = [amt for amt, cur in prices]
    avg = mean(amounts)
    currency = prices[0][1]
    return avg, currency


def get_appraisal(keyword):
    """Get complete price appraisal from all sources."""
    scraper = PriceScraper()
    return scraper.get_price_summary(keyword)


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python scraper.py <keyword>")
        sys.exit(1)
    keyword = " ".join(sys.argv[1:])
    print(f"Searching for prices: {keyword}")
    appraisal = get_appraisal(keyword)
    if appraisal["total_listings"] == 0:
        print("No results found.")
        sys.exit(0)
    print(f"Found {appraisal['total_listings']} total listings")
    for source, data in appraisal["sources"].items():
        print(f"{source}: {data['listings']} listings, Average: {data['currency']}{data['average']}")
    print(f"Overall Average: ${appraisal['overall_average']}")
'''

with open("scraper.py", "w") as f:
    f.write(scraper_code)
print("scraper.py created successfully!")
