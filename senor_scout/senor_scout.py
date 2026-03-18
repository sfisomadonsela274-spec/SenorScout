"""SenorScout - Ultra Beautiful AI Price Scanner."""

import reflex as rx
import httpx
import random
from typing import List, Dict, Any

class State(rx.State):
    """App state with animations."""
    
    search_query: str = ""
    is_loading: bool = False
    search_result: Dict[str, Any] = {}
    zar_price: float = 0.0
    
    # Compare
    compare_items: List[Dict[str, Any]] = []
    compare_active: bool = False
    
    # UI
    active_tab: str = "search"
    show_filters: bool = False
    fab_expanded: bool = False
    sheet_expanded: bool = True
    
    # Toast
    toast_message: str = ""
    toast_visible: bool = False
    toast_type: str = "info"
    
    # Particles for background
    particles: List[Dict[str, Any]] = []
    
    def on_mount(self):
        """Generate particles on mount."""
        self.particles = [
            {
                "x": random.randint(10, 90),
                "y": random.randint(10, 90),
                "size": random.randint(2, 6),
                "delay": random.randint(0, 5),
                "duration": random.randint(10, 20),
            }
            for _ in range(20)
        ]
    
    async def search_prices(self):
        if not self.search_query:
            self.show_toast("Enter search term", "warning")
            return
        self.is_loading = True
        yield
        try:
            async with httpx.AsyncClient() as client:
                response = await client.post(
                    "http://localhost:8000/scrape",
                    json={"keyword": self.search_query}
                )
                data = response.json()
                zar_response = await client.get(
                    f"http://localhost:8000/convert?usd={data.get('average_price', 0)}"
                )
                zar_data = zar_response.json()
                self.search_result = data
                self.zar_price = zar_data.get("zar_amount", 0)
                self.sheet_expanded = True
                self.show_toast("Prices found!", "success")
        except Exception as e:
            self.show_toast(f"Error: {str(e)}", "error")
        finally:
            self.is_loading = False
    
    def show_toast(self, message: str, type_: str = "info"):
        self.toast_message = message
        self.toast_type = type_
        self.toast_visible = True
    
    def hide_toast(self):
        self.toast_visible = False
    
    def add_to_compare(self):
        if self.search_result and len(self.compare_items) < 3:
            self.compare_items.append({
                "keyword": self.search_result.get("keyword"),
                "zar_price": self.zar_price,
                "usd_price": self.search_result.get("average_price", 0),
            })
            self.show_toast("Added to compare", "success")
    
    def remove_from_compare(self):
        if self.compare_items:
            self.compare_items.pop()
    
    def clear_compare(self):
        self.compare_items = []
        self.compare_active = False
    
    def toggle_compare(self):
        self.compare_active = not self.compare_active
    
    def toggle_fab(self):
        self.fab_expanded = not self.fab_expanded
    
    def toggle_sheet(self):
        self.sheet_expanded = not self.sheet_expanded
    
    def set_tab(self, tab: str):
        self.active_tab = tab
        self.fab_expanded = False
    
    def set_search_query(self, query: str):
        self.search_query = query
    
    def toggle_filters(self):
        self.show_filters = not self.show_filters

# Toast Component
def toast_notification() -> rx.Component:
    colors = {
        "success": "#00FF88",
        "error": "#FF4444", 
        "warning": "#FFB800",
        "info": "#00D4FF",
    }
    icons = {
        "success": "check_circle",
        "error": "x_circle",
        "warning": "alert_triangle",
        "info": "info",
    }
    return rx.cond(
        State.toast_visible,
        rx.box(
            rx.hstack(
                rx.icon(icons.get(State.toast_type, "info"), color=colors.get(State.toast_type, "#00D4FF")),
                rx.text(State.toast_message, color="white"),
                rx.button(
                    rx.icon("x", size=16),
                    on_click=State.hide_toast,
                    variant="ghost",
                    size="1",
                ),
                spacing="3",
                align="center",
            ),
            style={
                "position": "fixed",
                "top": "20px",
                "right": "20px",
                "background": "rgba(10,10,26,0.95)",
                "border_radius": "12px",
                "padding": "16px 20px",
                "border_left": f"4px solid {colors.get(State.toast_type, '#00D4FF')}",
                "box_shadow": f"0 4px 20px {colors.get(State.toast_type, '#00D4FF')}33",
                "z_index": "2000",
                "animation": "slideInRight 0.3s ease",
            },
        ),
        rx.box(),
    )

# Shimmer Skeleton
def shimmer_skeleton() -> rx.Component:
    return rx.box(
        rx.vstack(
            rx.box(style={"height": "20px", "width": "40%", "background": "linear-gradient(90deg, #1a1a3e, #2a2a5e, #1a1a3e)", "border_radius": "4px", "animation": "shimmer 1.5s infinite"}),
            rx.box(style={"height": "40px", "width": "70%", "background": "linear-gradient(90deg, #1a1a3e, #2a2a5e, #1a1a3e)", "border_radius": "4px", "animation": "shimmer 1.5s infinite 0.2s"}),
            rx.box(style={"height": "16px", "width": "50%", "background": "linear-gradient(90deg, #1a1a3e, #2a2a5e, #1a1a3e)", "border_radius": "4px", "animation": "shimmer 1.5s infinite 0.4s"}),
            spacing="3",
        ),
        style={
            "background": "rgba(22,42,74,0.6)",
            "border_radius": "20px",
            "padding": "20px",
            "width": "100%",
            "overflow": "hidden",
        },
    )

# Glass Card with Neon Glow
def neon_glass_card(children: rx.Component, glow_color: str = "#00FF88") -> rx.Component:
    return rx.box(
        children,
        style={
            "background": f"linear-gradient(135deg, rgba(30,58,42,0.85), rgba(22,42,30,0.75))",
            "border_radius": "24px",
            "border": f"1px solid {glow_color}40",
            "backdrop_filter": "blur(20px)",
            "padding": "24px",
            "box_shadow": f"0 8px 32px {glow_color}20, inset 0 1px 0 rgba(255,255,255,0.1)",
            "transition": "all 0.3s ease",
            "_hover": {
                "transform": "translateY(-4px)",
                "box_shadow": f"0 12px 40px {glow_color}40, inset 0 1px 0 rgba(255,255,255,0.2)",
                "border": f"1px solid {glow_color}60",
            },
        },
    )

# Price Card with 3D Tilt
def tilt_price_card(data: Dict[str, Any], zar_price: float) -> rx.Component:
    return rx.box(
        rx.vstack(
            rx.hstack(
                rx.box(
                    rx.icon("shopping_bag", color="white", size=20),
                    style={
                        "background": "linear-gradient(135deg, #00FF88, #00D4FF)",
                        "border_radius": "12px",
                        "padding": "12px",
                        "box_shadow": "0 4px 15px rgba(0,255,136,0.4)",
                    }
                ),
                rx.text(
                    data.get("keyword", "ITEM"),
                    color="white",
                    font_size="20px",
                    font_weight="bold",
                    letter_spacing="0.5px",
                ),
                spacing="4",
            ),
            rx.divider(border_color="rgba(255,255,255,0.1)"),
            rx.hstack(
                rx.vstack(
                    rx.text("ZAR", color="rgba(255,255,255,0.5)", font_size="12px"),
                    rx.text(
                        f"R{zar_price:.2f}",
                        color="#00FF88",
                        font_size="40px",
                        font_weight="bold",
                        text_shadow="0 0 20px rgba(0,255,136,0.5)",
                    ),
                    align="start",
                    spacing="0",
                ),
                rx.vstack(
                    rx.text("USD", color="rgba(255,255,255,0.5)", font_size="12px"),
                    rx.text(
                        f"${data.get('average_price', 0):.2f}",
                        color="rgba(255,255,255,0.7)",
                        font_size="20px",
                    ),
                    align="start",
                    spacing="0",
                ),
                justify="between",
                width="100%",
            ),
            rx.hstack(
                rx.badge(
                    rx.hstack(rx.icon("bar_chart", size=14), rx.text(f"{data.get('num_listings', 0)} listings"), spacing="1"),
                    color_scheme="green",
                    size="2",
                ),
                rx.badge(
                    rx.hstack(rx.icon("store", size=14), rx.text("Multi-source"), spacing="1"),
                    color_scheme="blue",
                    size="2",
                ),
                spacing="2",
                wrap="wrap",
            ),
            spacing="4",
            align="start",
            width="100%",
        ),
        style={
            "background": "linear-gradient(145deg, rgba(30,58,42,0.9), rgba(22,42,30,0.85))",
            "border_radius": "24px",
            "border": "2px solid rgba(0,255,136,0.3)",
            "padding": "24px",
            "backdrop_filter": "blur(20px)",
            "transform_style": "preserve-3d",
            "transition": "transform 0.3s ease, box-shadow 0.3s ease",
            "_hover": {
                "transform": "rotateX(5deg) rotateY(-5deg) translateZ(20px)",
                "box_shadow": "0 25px 50px rgba(0,255,136,0.2), 0 0 30px rgba(0,255,136,0.1)",
            },
        },
    )

# Animated Gradient Button
def glow_button(text: str, icon: str, on_click, gradient: List[str]) -> rx.Component:
    return rx.button(
        rx.hstack(
            rx.icon(icon, color="white"),
            rx.text(text, color="white", font_weight="bold"),
            spacing="3",
        ),
        on_click=on_click,
        style={
            "background": f"linear-gradient(135deg, {gradient[0]}, {gradient[1]})",
            "border_radius": "16px",
            "padding": "16px 32px",
            "border": "none",
            "cursor": "pointer",
            "box_shadow": f"0 8px 25px {gradient[0]}66, 0 0 20px {gradient[0]}33",
            "transition": "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
            "_hover": {
                "transform": "translateY(-3px) scale(1.02)",
                "box_shadow": f"0 15px 35px {gradient[0]}88, 0 0 30px {gradient[0]}55",
            },
            "_active": {
                "transform": "translateY(-1px) scale(0.98)",
            },
        },
    )

# Particle Background
def particle_background() -> rx.Component:
    return rx.foreach(
        State.particles,
        lambda p: rx.box(
            style={
                "position": "fixed",
                "left": f"{p.get('x', 50)}%",
                "top": f"{p.get('y', 50)}%",
                "width": f"{p.get('size', 3)}px",
                "height": f"{p.get('size', 3)}px",
                "background": "radial-gradient(circle, rgba(0,212,255,0.8), transparent)",
                "border_radius": "50%",
                "animation": f"floatParticle {p.get('duration', 15)}s ease-in-out infinite",
                "animation_delay": f"{p.get('delay', 0)}s",
                "pointer_events": "none",
                "z_index": "-1",
            },
        ),
    )

# Bottom Sheet
def bottom_sheet() -> rx.Component:
    return rx.cond(
        State.search_result,
        rx.box(
            rx.vstack(
                rx.box(
                    style={
                        "width": "50px",
                        "height": "5px",
                        "background": "linear-gradient(90deg, #00FF88, #00D4FF)",
                        "border_radius": "3px",
                        "margin": "12px auto",
                        "cursor": "pointer",
                        "box_shadow": "0 0 10px rgba(0,255,136,0.5)",
                    },
                    on_click=State.toggle_sheet,
                ),
                tilt_price_card(State.search_result, State.zar_price),
                rx.cond(
                    State.compare_active,
                    neon_glass_card(
                        rx.vstack(
                            rx.hstack(
                                rx.text("Compare", color="white", font_weight="bold", font_size="lg"),
                                rx.badge(f"{State.compare_items.length()}/3", color_scheme="cyan"),
                                justify="between",
                                width="100%",
                            ),
                            rx.hstack(
                                rx.cond(
                                    State.compare_items.length() > 0,
                                    rx.box(
                                        rx.vstack(
                                            rx.text(State.compare_items[0].get("keyword", ""), color="white", font_size="sm"),
                                            rx.text(f"R{State.compare_items[0].get('zar_price', 0):.0f}", color="#00FF88", font_weight="bold"),
                                            spacing="1",
                                        ),
                                        style={
                                            "background": "rgba(0,255,136,0.1)",
                                            "border_radius": "12px",
                                            "padding": "12px",
                                            "border": "1px solid rgba(0,255,136,0.3)",
                                        },
                                    ),
                                    rx.box(),
                                ),
                                spacing="3",
                                wrap="wrap",
                            ),
                            rx.hstack(
                                glow_button("Add", "plus", State.add_to_compare, ["#00FF88", "#00CC6A"]),
                                rx.button(
                                    "Clear",
                                    on_click=State.clear_compare,
                                    color_scheme="red",
                                    variant="soft",
                                ),
                                spacing="2",
                            ),
                            spacing="3",
                            align="start",
                        ),
                        "#00D4FF"
                    ),
                    rx.box(),
                ),
                rx.hstack(
                    rx.button(
                        rx.hstack(rx.icon("git_compare"), rx.text("Compare")),
                        on_click=State.toggle_compare,
                        color_scheme=rx.cond(State.compare_active, "cyan", "gray"),
                        size="2",
                    ),
                    rx.button(
                        rx.hstack(rx.icon("share_2"), rx.text("Share")),
                        color_scheme="blue",
                        size="2",
                    ),
                    rx.button(
                        rx.hstack(rx.icon("bookmark"), rx.text("Save")),
                        color_scheme="green",
                        size="2",
                    ),
                    spacing="2",
                    wrap="wrap",
                ),
                spacing="4",
                padding="20px",
            ),
            style={
                "position": "fixed",
                "bottom": "0",
                "left": "0",
                "right": "0",
                "background": "linear-gradient(180deg, rgba(10,10,26,0.98), rgba(10,10,26,1))",
                "border_radius": "30px 30px 0 0",
                "border_top": "2px solid rgba(0,255,136,0.4)",
                "backdrop_filter": "blur(30px)",
                "z_index": "100",
                "max_height": rx.cond(State.sheet_expanded, "75vh", "180px"),
                "overflow_y": "auto",
                "box_shadow": "0 -10px 40px rgba(0,0,0,0.5)",
            },
        ),
        rx.box(),
    )

# FAB with Animation
def fab_button() -> rx.Component:
    return rx.box(
        rx.vstack(
            rx.cond(
                State.fab_expanded,
                rx.vstack(
                    rx.button(
                        rx.icon("camera"),
                        on_click=lambda: State.set_tab("camera"),
                        size="3",
                        border_radius="full",
                        color_scheme="blue",
                        style={"animation": "popIn 0.3s ease"},
                    ),
                    rx.button(
                        rx.icon("upload"),
                        on_click=lambda: State.set_tab("upload"),
                        size="3",
                        border_radius="full",
                        color_scheme="purple",
                        style={"animation": "popIn 0.3s ease 0.1s backwards"},
                    ),
                    rx.button(
                        rx.icon("search"),
                        on_click=lambda: State.set_tab("search"),
                        size="3",
                        border_radius="full",
                        color_scheme="green",
                        style={"animation": "popIn 0.3s ease 0.2s backwards"},
                    ),
                    spacing="3",
                ),
                rx.box(),
            ),
            rx.button(
                rx.cond(State.fab_expanded, rx.icon("x"), rx.icon("plus")),
                on_click=State.toggle_fab,
                size="4",
                border_radius="full",
                color_scheme="cyan",
                style={
                    "box_shadow": "0 4px 25px rgba(0,212,255,0.6), 0 0 20px rgba(0,212,255,0.3)",
                    "transition": "transform 0.3s ease, box-shadow 0.3s ease",
                    "_hover": {
                        "transform": "scale(1.1)",
                        "box_shadow": "0 6px 30px rgba(0,212,255,0.8), 0 0 30px rgba(0,212,255,0.5)",
                    },
                },
            ),
            spacing="3",
            align="center",
        ),
        style={
            "position": "fixed",
            "bottom": "40px",
            "right": "40px",
            "z_index": "1000",
        },
    )

# Main App
def index() -> rx.Component:
    return rx.box(
        # Animated gradient background
        rx.box(
            style={
                "position": "fixed",
                "top": "0",
                "left": "0",
                "width": "100%",
                "height": "100%",
                "background": "linear-gradient(-45deg, #0A0A1A, #1A1A3E, #162A4A, #0A0A1A)",
                "background_size": "400% 400%",
                "animation": "gradientBG 15s ease infinite",
                "z_index": "-3",
            }
        ),
        # Floating orbs
        rx.box(
            style={
                "position": "fixed",
                "top": "15%",
                "left": "5%",
                "width": "400px",
                "height": "400px",
                "background": "radial-gradient(circle, rgba(0,212,255,0.2) 0%, transparent 70%)",
                "border_radius": "50%",
                "filter": "blur(60px)",
                "animation": "floatOrb1 20s ease-in-out infinite",
                "z_index": "-2",
            }
        ),
        rx.box(
            style={
                "position": "fixed",
                "bottom": "10%",
                "right": "5%",
                "width": "500px",
                "height": "500px",
                "background": "radial-gradient(circle, rgba(0,255,136,0.15) 0%, transparent 70%)",
                "border_radius": "50%",
                "filter": "blur(80px)",
                "animation": "floatOrb2 25s ease-in-out infinite reverse",
                "z_index": "-2",
            }
        ),
        # Particles
        particle_background(),
        
        # Toast
        toast_notification(),
        
        # Main content
        rx.vstack(
            # Header
            rx.box(
                rx.hstack(
                    rx.heading(
                        "📸 SenorScout",
                        style={
                            "background": "linear-gradient(90deg, #00D4FF, #00FF88)",
                            "background_clip": "text",
                            "color": "transparent",
                            "font_size": "1.8rem",
                            "font_weight": "bold",
                            "text_shadow": "0 0 30px rgba(0,212,255,0.5)",
                        }
                    ),
                    rx.cond(
                        State.is_loading,
                        rx.spinner(size="3", color="cyan", thickness="3px"),
                        rx.box(),
                    ),
                    rx.button(
                        rx.icon("sliders_horizontal"),
                        on_click=State.toggle_filters,
                        size="2",
                        variant="ghost",
                        color="white",
                    ),
                    justify="between",
                    align="center",
                    width="100%",
                ),
                style={
                    "position": "sticky",
                    "top": "0",
                    "z_index": "50",
                    "background": "rgba(10,10,26,0.8)",
                    "backdrop_filter": "blur(20px)",
                    "padding": "16px 24px",
                    "border_bottom": "1px solid rgba(0,255,136,0.2)",
                },
            ),
            
            # Filters
            rx.cond(
                State.show_filters,
                rx.box(
                    rx.hstack(
                        rx.button("Relevance", size="2", border_radius="full", variant="solid", color_scheme="cyan"),
                        rx.button("Low-High", size="2", border_radius="full", variant="soft"),
                        rx.button("High-Low", size="2", border_radius="full", variant="soft"),
                        spacing="2",
                        wrap="wrap",
                        padding="12px 24px",
                    ),
                    style={"background": "rgba(22,33,62,0.9)"},
                ),
                rx.box(),
            ),
            
            # Tab Content
            rx.cond(
                State.active_tab == "search",
                rx.vstack(
                    neon_glass_card(
                        rx.vstack(
                            rx.input(
                                placeholder="What are you looking for?",
                                value=State.search_query,
                                on_change=State.set_search_query,
                                style={
                                    "background": "rgba(0,0,0,0.3)",
                                    "border": "1px solid rgba(0,255,136,0.3)",
                                    "border_radius": "16px",
                                    "color": "white",
                                    "padding": "18px",
                                    "font_size": "16px",
                                    "_focus": {"border": "1px solid rgba(0,255,136,0.6)", "box_shadow": "0 0 20px rgba(0,255,136,0.2)"},
                                },
                                size="3",
                            ),
                            glow_button("Search Prices", "search", State.search_prices, ["#00FF88", "#00CC6A"]),
                            spacing="4",
                        ),
                        "#00FF88"
                    ),
                    rx.cond(
                        State.is_loading,
                        shimmer_skeleton(),
                        rx.box(),
                    ),
                    spacing="4",
                    padding="20px",
                    width="100%",
                    max_width="600px",
                ),
                rx.cond(
                    State.active_tab == "camera",
                    rx.center(
                        rx.vstack(
                            rx.box(
                                rx.icon("camera", size=120, color="#00D4FF"),
                                style={
                                    "padding": "50px",
                                    "border_radius": "50%",
                                    "background": "linear-gradient(135deg, rgba(0,212,255,0.2), rgba(0,212,255,0.05))",
                                    "border": "2px solid rgba(0,212,255,0.4)",
                                    "box_shadow": "0 0 40px rgba(0,212,255,0.3), inset 0 0 20px rgba(0,212,255,0.1)",
                                }
                            ),
                            rx.heading("Point & Scan", color="white", size="7"),
                            rx.text("Aim your camera at any item", color="rgba(255,255,255,0.6)"),
                            glow_button("Open Camera", "aperture", State.toggle_fab, ["#00D4FF", "#0099CC"]),
                            spacing="6",
                            align="center",
                        ),
                        height="70vh",
                    ),
                    rx.center(
                        rx.vstack(
                            rx.box(
                                rx.icon("cloud", size=80, color="rgba(139,92,246,0.8)"),
                                rx.text("Drop image here", color="rgba(255,255,255,0.7)"),
                                rx.text("or click to browse", color="rgba(255,255,255,0.5)", font_size="sm"),
                                spacing="4",
                                align="center",
                                padding="80px 60px",
                            ),
                            style={
                                "border": "3px dashed rgba(139,92,246,0.5)",
                                "border_radius": "30px",
                                "background": "linear-gradient(135deg, rgba(88,28,135,0.15), rgba(67,20,102,0.05))",
                            },
                        ),
                        height="70vh",
                    ),
                ),
            ),
            
            spacing="0",
            width="100%",
            min_height="100vh",
        ),
        
        fab_button(),
        bottom_sheet(),
        
        # CSS Animations
        rx.el.style(
            """
            @keyframes gradientBG {
                0% { background-position: 0% 50%; }
                50% { background-position: 100% 50%; }
                100% { background-position: 0% 50%; }
            }
            @keyframes floatOrb1 {
                0%, 100% { transform: translate(0, 0) scale(1); }
                50% { transform: translate(30px, -30px) scale(1.1); }
            }
            @keyframes floatOrb2 {
                0%, 100% { transform: translate(0, 0) scale(1); }
                50% { transform: translate(-40px, 20px) scale(0.9); }
            }
            @keyframes floatParticle {
                0%, 100% { transform: translateY(0) translateX(0); opacity: 0.3; }
                50% { transform: translateY(-100px) translateX(50px); opacity: 0.8; }
            }
            @keyframes shimmer {
                0% { background-position: -200% 0; }
                100% { background-position: 200% 0; }
            }
            @keyframes slideInRight {
                from { transform: translateX(100%); opacity: 0; }
                to { transform: translateX(0); opacity: 1; }
            }
            @keyframes popIn {
                from { transform: scale(0) translateY(20px); opacity: 0; }
                to { transform: scale(1) translateY(0); opacity: 1; }
            }
            """
        ),
        on_mount=State.on_mount,
    )

app = rx.App()
app.add_page(index, title="SenorScout - AI Price Scanner")
