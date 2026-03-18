import {Fragment,useCallback,useContext,useEffect} from "react"
import {Badge as RadixThemesBadge,Box as RadixThemesBox,Button as RadixThemesButton,Flex as RadixThemesFlex,Heading as RadixThemesHeading,Separator as RadixThemesSeparator,Spinner as RadixThemesSpinner,Text as RadixThemesText,TextField as RadixThemesTextField} from "@radix-ui/themes"
import {EventLoopContext,StateContexts} from "$/utils/context"
import {ReflexEvent,isNotNullOrUndefined,isTrue} from "$/utils/state"
import {Aperture as LucideAperture,BarChart as LucideBarChart,Bookmark as LucideBookmark,Camera as LucideCamera,Cloud as LucideCloud,GitCompare as LucideGitCompare,Info as LucideInfo,Plus as LucidePlus,Search as LucideSearch,Share2 as LucideShare2,ShoppingBag as LucideShoppingBag,SlidersHorizontal as LucideSlidersHorizontal,Store as LucideStore,Upload as LucideUpload,X as LucideX} from "lucide-react"
import DebounceInput from "react-debounce-input"
import {jsx} from "@emotion/react"




function Text_306baaf8f027564a09525e8c1d1aa031 () {
  const reflex___state____state__senor_scout___senor_scout____state = useContext(StateContexts.reflex___state____state__senor_scout___senor_scout____state)



  return (
    jsx(RadixThemesText,{as:"p",css:({ ["color"] : "white" })},reflex___state____state__senor_scout___senor_scout____state.toast_message_rx_state_)
  )
}


function Button_588089250f30a17f821103f3ea671df8 () {
  const [addEvents, connectErrors] = useContext(EventLoopContext);

const on_click_27b6ba1e148243fcb85f872a4e3da6ba = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.senor_scout___senor_scout____state.hide_toast", ({  }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])

  return (
    jsx(RadixThemesButton,{onClick:on_click_27b6ba1e148243fcb85f872a4e3da6ba,size:"1",variant:"ghost"},jsx(LucideX,{size:16},))
  )
}


function Fragment_f522ccc0087caa97467e4925e9b1a7d3 () {
  const reflex___state____state__senor_scout___senor_scout____state = useContext(StateContexts.reflex___state____state__senor_scout___senor_scout____state)



  return (
    jsx(Fragment,{},(reflex___state____state__senor_scout___senor_scout____state.toast_visible_rx_state_?(jsx(Fragment,{},jsx(RadixThemesBox,{css:({ ["position"] : "fixed", ["top"] : "20px", ["right"] : "20px", ["background"] : "rgba(10,10,26,0.95)", ["borderRadius"] : "12px", ["padding"] : "16px 20px", ["borderLeft"] : "4px solid #00D4FF", ["boxShadow"] : "0 4px 20px #00D4FF33", ["zIndex"] : "2000", ["animation"] : "slideInRight 0.3s ease" })},jsx(RadixThemesFlex,{align:"center",className:"rx-Stack",direction:"row",gap:"3"},jsx(LucideInfo,{css:({ ["color"] : "#00D4FF" })},),jsx(Text_306baaf8f027564a09525e8c1d1aa031,{},),jsx(Button_588089250f30a17f821103f3ea671df8,{},))))):(jsx(Fragment,{},jsx(RadixThemesBox,{},)))))
  )
}


function Fragment_0bc5e02f734ddf89cb9ad57f24f29431 () {
  const reflex___state____state__senor_scout___senor_scout____state = useContext(StateContexts.reflex___state____state__senor_scout___senor_scout____state)



  return (
    jsx(Fragment,{},(reflex___state____state__senor_scout___senor_scout____state.is_loading_rx_state_?(jsx(Fragment,{},jsx(RadixThemesSpinner,{css:({ ["color"] : "cyan", ["thickness"] : "3px" }),size:"3"},))):(jsx(Fragment,{},jsx(RadixThemesBox,{},)))))
  )
}


function Button_171a133c001e304598c2e5216de6c8b2 () {
  const [addEvents, connectErrors] = useContext(EventLoopContext);

const on_click_dacfc117ffb00da11070caaff5da48d5 = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.senor_scout___senor_scout____state.toggle_filters", ({  }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])

  return (
    jsx(RadixThemesButton,{css:({ ["color"] : "white" }),onClick:on_click_dacfc117ffb00da11070caaff5da48d5,size:"2",variant:"ghost"},jsx(LucideSlidersHorizontal,{},))
  )
}


function Fragment_67d4a03bf9e13c625cdc0e966d6a28ef () {
  const reflex___state____state__senor_scout___senor_scout____state = useContext(StateContexts.reflex___state____state__senor_scout___senor_scout____state)



  return (
    jsx(Fragment,{},(reflex___state____state__senor_scout___senor_scout____state.show_filters_rx_state_?(jsx(Fragment,{},jsx(RadixThemesBox,{css:({ ["background"] : "rgba(22,33,62,0.9)" })},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["padding"] : "12px 24px" }),direction:"row",gap:"2",wrap:"wrap"},jsx(RadixThemesButton,{color:"cyan",css:({ ["borderRadius"] : "full" }),size:"2",variant:"solid"},"Relevance"),jsx(RadixThemesButton,{css:({ ["borderRadius"] : "full" }),size:"2",variant:"soft"},"Low-High"),jsx(RadixThemesButton,{css:({ ["borderRadius"] : "full" }),size:"2",variant:"soft"},"High-Low"))))):(jsx(Fragment,{},jsx(RadixThemesBox,{},)))))
  )
}


function Debounceinput_73a47b9458c8873842b56407881ab8b1 () {
  const reflex___state____state__senor_scout___senor_scout____state = useContext(StateContexts.reflex___state____state__senor_scout___senor_scout____state)
const [addEvents, connectErrors] = useContext(EventLoopContext);

const on_change_f65f026ba253e5ec26fece8e5b534636 = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.senor_scout___senor_scout____state.set_search_query", ({ ["query"] : _e?.["target"]?.["value"] }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])

  return (
    jsx(DebounceInput,{css:({ ["background"] : "rgba(0,0,0,0.3)", ["border"] : "1px solid rgba(0,255,136,0.3)", ["borderRadius"] : "16px", ["color"] : "white", ["padding"] : "18px", ["fontSize"] : "16px", ["&:focus"] : ({ ["border"] : "1px solid rgba(0,255,136,0.6)", ["boxShadow"] : "0 0 20px rgba(0,255,136,0.2)" }) }),debounceTimeout:300,element:RadixThemesTextField.Root,onChange:on_change_f65f026ba253e5ec26fece8e5b534636,placeholder:"What are you looking for?",size:"3",value:(isNotNullOrUndefined(reflex___state____state__senor_scout___senor_scout____state.search_query_rx_state_) ? reflex___state____state__senor_scout___senor_scout____state.search_query_rx_state_ : "")},)
  )
}


function Button_d1ff25a1b7e50eddcee7c1379e93d69e () {
  const [addEvents, connectErrors] = useContext(EventLoopContext);

const on_click_6e12482c5f548449684fda4f223c6046 = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.senor_scout___senor_scout____state.search_prices", ({  }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])

  return (
    jsx(RadixThemesButton,{css:({ ["background"] : "linear-gradient(135deg, #00FF88, #00CC6A)", ["borderRadius"] : "16px", ["padding"] : "16px 32px", ["border"] : "none", ["cursor"] : "pointer", ["boxShadow"] : "0 8px 25px #00FF8866, 0 0 20px #00FF8833", ["transition"] : "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)", ["&:hover"] : ({ ["transform"] : "translateY(-3px) scale(1.02)", ["boxShadow"] : "0 15px 35px #00FF8888, 0 0 30px #00FF8855" }), ["&:active"] : ({ ["transform"] : "translateY(-1px) scale(0.98)" }) }),onClick:on_click_6e12482c5f548449684fda4f223c6046},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",direction:"row",gap:"3"},jsx(LucideSearch,{css:({ ["color"] : "white" })},),jsx(RadixThemesText,{as:"p",css:({ ["color"] : "white", ["fontWeight"] : "bold" })},"Search Prices")))
  )
}


function Fragment_146d112c93b76a7601777aad72db95f9 () {
  const reflex___state____state__senor_scout___senor_scout____state = useContext(StateContexts.reflex___state____state__senor_scout___senor_scout____state)



  return (
    jsx(Fragment,{},(reflex___state____state__senor_scout___senor_scout____state.is_loading_rx_state_?(jsx(Fragment,{},jsx(RadixThemesBox,{css:({ ["background"] : "rgba(22,42,74,0.6)", ["borderRadius"] : "20px", ["padding"] : "20px", ["width"] : "100%", ["overflow"] : "hidden" })},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",direction:"column",gap:"3"},jsx(RadixThemesBox,{css:({ ["height"] : "20px", ["width"] : "40%", ["background"] : "linear-gradient(90deg, #1a1a3e, #2a2a5e, #1a1a3e)", ["borderRadius"] : "4px", ["animation"] : "shimmer 1.5s infinite" })},),jsx(RadixThemesBox,{css:({ ["height"] : "40px", ["width"] : "70%", ["background"] : "linear-gradient(90deg, #1a1a3e, #2a2a5e, #1a1a3e)", ["borderRadius"] : "4px", ["animation"] : "shimmer 1.5s infinite 0.2s" })},),jsx(RadixThemesBox,{css:({ ["height"] : "16px", ["width"] : "50%", ["background"] : "linear-gradient(90deg, #1a1a3e, #2a2a5e, #1a1a3e)", ["borderRadius"] : "4px", ["animation"] : "shimmer 1.5s infinite 0.4s" })},))))):(jsx(Fragment,{},jsx(RadixThemesBox,{},)))))
  )
}


function Button_9a49c5de5a6194b22c7dd5e77ffce91e () {
  const [addEvents, connectErrors] = useContext(EventLoopContext);

const on_click_a30ae64420073d872984ce63b2f850bc = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.senor_scout___senor_scout____state.toggle_fab", ({  }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])

  return (
    jsx(RadixThemesButton,{css:({ ["background"] : "linear-gradient(135deg, #00D4FF, #0099CC)", ["borderRadius"] : "16px", ["padding"] : "16px 32px", ["border"] : "none", ["cursor"] : "pointer", ["boxShadow"] : "0 8px 25px #00D4FF66, 0 0 20px #00D4FF33", ["transition"] : "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)", ["&:hover"] : ({ ["transform"] : "translateY(-3px) scale(1.02)", ["boxShadow"] : "0 15px 35px #00D4FF88, 0 0 30px #00D4FF55" }), ["&:active"] : ({ ["transform"] : "translateY(-1px) scale(0.98)" }) }),onClick:on_click_a30ae64420073d872984ce63b2f850bc},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",direction:"row",gap:"3"},jsx(LucideAperture,{css:({ ["color"] : "white" })},),jsx(RadixThemesText,{as:"p",css:({ ["color"] : "white", ["fontWeight"] : "bold" })},"Open Camera")))
  )
}


function Fragment_e3a2a4be3bfec04c1d3c8f22a8357079 () {
  const reflex___state____state__senor_scout___senor_scout____state = useContext(StateContexts.reflex___state____state__senor_scout___senor_scout____state)



  return (
    jsx(Fragment,{},((reflex___state____state__senor_scout___senor_scout____state.active_tab_rx_state_?.valueOf?.() === "camera"?.valueOf?.())?(jsx(Fragment,{},jsx(RadixThemesFlex,{css:({ ["display"] : "flex", ["alignItems"] : "center", ["justifyContent"] : "center", ["height"] : "70vh" })},jsx(RadixThemesFlex,{align:"center",className:"rx-Stack",direction:"column",gap:"6"},jsx(RadixThemesBox,{css:({ ["padding"] : "50px", ["borderRadius"] : "50%", ["background"] : "linear-gradient(135deg, rgba(0,212,255,0.2), rgba(0,212,255,0.05))", ["border"] : "2px solid rgba(0,212,255,0.4)", ["boxShadow"] : "0 0 40px rgba(0,212,255,0.3), inset 0 0 20px rgba(0,212,255,0.1)" })},jsx(LucideCamera,{css:({ ["color"] : "#00D4FF" }),size:120},)),jsx(RadixThemesHeading,{css:({ ["color"] : "white" }),size:"7"},"Point & Scan"),jsx(RadixThemesText,{as:"p",css:({ ["color"] : "rgba(255,255,255,0.6)" })},"Aim your camera at any item"),jsx(Button_9a49c5de5a6194b22c7dd5e77ffce91e,{},))))):(jsx(Fragment,{},jsx(RadixThemesFlex,{css:({ ["display"] : "flex", ["alignItems"] : "center", ["justifyContent"] : "center", ["height"] : "70vh" })},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["border"] : "3px dashed rgba(139,92,246,0.5)", ["borderRadius"] : "30px", ["background"] : "linear-gradient(135deg, rgba(88,28,135,0.15), rgba(67,20,102,0.05))" }),direction:"column",gap:"3"},jsx(RadixThemesBox,{css:({ ["spacing"] : "4", ["align"] : "center", ["padding"] : "80px 60px" })},jsx(LucideCloud,{css:({ ["color"] : "rgba(139,92,246,0.8)" }),size:80},),jsx(RadixThemesText,{as:"p",css:({ ["color"] : "rgba(255,255,255,0.7)" })},"Drop image here"),jsx(RadixThemesText,{as:"p",css:({ ["color"] : "rgba(255,255,255,0.5)", ["fontSize"] : "sm" })},"or click to browse"))))))))
  )
}


function Fragment_4bf4111926a0307112a17ae732198d35 () {
  const reflex___state____state__senor_scout___senor_scout____state = useContext(StateContexts.reflex___state____state__senor_scout___senor_scout____state)



  return (
    jsx(Fragment,{},((reflex___state____state__senor_scout___senor_scout____state.active_tab_rx_state_?.valueOf?.() === "search"?.valueOf?.())?(jsx(Fragment,{},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["padding"] : "20px", ["width"] : "100%", ["maxWidth"] : "600px" }),direction:"column",gap:"4"},jsx(RadixThemesBox,{css:({ ["background"] : "linear-gradient(135deg, rgba(30,58,42,0.85), rgba(22,42,30,0.75))", ["borderRadius"] : "24px", ["border"] : "1px solid #00FF8840", ["backdropFilter"] : "blur(20px)", ["padding"] : "24px", ["boxShadow"] : "0 8px 32px #00FF8820, inset 0 1px 0 rgba(255,255,255,0.1)", ["transition"] : "all 0.3s ease", ["&:hover"] : ({ ["transform"] : "translateY(-4px)", ["boxShadow"] : "0 12px 40px #00FF8840, inset 0 1px 0 rgba(255,255,255,0.2)", ["border"] : "1px solid #00FF8860" }) })},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",direction:"column",gap:"4"},jsx(Debounceinput_73a47b9458c8873842b56407881ab8b1,{},),jsx(Button_d1ff25a1b7e50eddcee7c1379e93d69e,{},))),jsx(Fragment_146d112c93b76a7601777aad72db95f9,{},)))):(jsx(Fragment_e3a2a4be3bfec04c1d3c8f22a8357079,{},))))
  )
}


function Button_c3bbf0f08b1a6d12c1864a90520d4f71 () {
  const [addEvents, connectErrors] = useContext(EventLoopContext);

const on_click_a359c2417065b4835859adb30ba1f2b5 = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.senor_scout___senor_scout____state.set_tab", ({ ["tab"] : "camera" }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])

  return (
    jsx(RadixThemesButton,{color:"blue",css:({ ["animation"] : "popIn 0.3s ease", ["borderRadius"] : "full" }),onClick:on_click_a359c2417065b4835859adb30ba1f2b5,size:"3"},jsx(LucideCamera,{},))
  )
}


function Button_db4cef4f6b90fd66b139278232e0519d () {
  const [addEvents, connectErrors] = useContext(EventLoopContext);

const on_click_e5ee4116130096ce63047d2f8fad0be9 = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.senor_scout___senor_scout____state.set_tab", ({ ["tab"] : "upload" }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])

  return (
    jsx(RadixThemesButton,{color:"purple",css:({ ["animation"] : "popIn 0.3s ease 0.1s backwards", ["borderRadius"] : "full" }),onClick:on_click_e5ee4116130096ce63047d2f8fad0be9,size:"3"},jsx(LucideUpload,{},))
  )
}


function Button_3ec845fd7cca6c21badcfd74401a76e1 () {
  const [addEvents, connectErrors] = useContext(EventLoopContext);

const on_click_3fb8a47c9508da9ef9a78a187bffa3b0 = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.senor_scout___senor_scout____state.set_tab", ({ ["tab"] : "search" }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])

  return (
    jsx(RadixThemesButton,{color:"green",css:({ ["animation"] : "popIn 0.3s ease 0.2s backwards", ["borderRadius"] : "full" }),onClick:on_click_3fb8a47c9508da9ef9a78a187bffa3b0,size:"3"},jsx(LucideSearch,{},))
  )
}


function Fragment_a76f50e2ceed05cf218b815c94db7982 () {
  const reflex___state____state__senor_scout___senor_scout____state = useContext(StateContexts.reflex___state____state__senor_scout___senor_scout____state)



  return (
    jsx(Fragment,{},(reflex___state____state__senor_scout___senor_scout____state.fab_expanded_rx_state_?(jsx(Fragment,{},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",direction:"column",gap:"3"},jsx(Button_c3bbf0f08b1a6d12c1864a90520d4f71,{},),jsx(Button_db4cef4f6b90fd66b139278232e0519d,{},),jsx(Button_3ec845fd7cca6c21badcfd74401a76e1,{},)))):(jsx(Fragment,{},jsx(RadixThemesBox,{},)))))
  )
}


function Fragment_ebc3cab1922b111cd1987823ca497d86 () {
  const reflex___state____state__senor_scout___senor_scout____state = useContext(StateContexts.reflex___state____state__senor_scout___senor_scout____state)



  return (
    jsx(Fragment,{},(reflex___state____state__senor_scout___senor_scout____state.fab_expanded_rx_state_?(jsx(Fragment,{},jsx(LucideX,{},))):(jsx(Fragment,{},jsx(LucidePlus,{},)))))
  )
}


function Button_cd6ea976cf2bcd421956cbbcdbd7a8b7 () {
  const [addEvents, connectErrors] = useContext(EventLoopContext);

const on_click_a30ae64420073d872984ce63b2f850bc = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.senor_scout___senor_scout____state.toggle_fab", ({  }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])

  return (
    jsx(RadixThemesButton,{color:"cyan",css:({ ["boxShadow"] : "0 4px 25px rgba(0,212,255,0.6), 0 0 20px rgba(0,212,255,0.3)", ["transition"] : "transform 0.3s ease, box-shadow 0.3s ease", ["&:hover"] : ({ ["transform"] : "scale(1.1)", ["boxShadow"] : "0 6px 30px rgba(0,212,255,0.8), 0 0 30px rgba(0,212,255,0.5)" }), ["borderRadius"] : "full" }),onClick:on_click_a30ae64420073d872984ce63b2f850bc,size:"4"},jsx(Fragment_ebc3cab1922b111cd1987823ca497d86,{},))
  )
}


function Box_e8bfcd2e15c17139544a206a0e49d3fe () {
  const [addEvents, connectErrors] = useContext(EventLoopContext);

const on_click_2699ddb109a9535e76dfa355f8bfd640 = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.senor_scout___senor_scout____state.toggle_sheet", ({  }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])

  return (
    jsx(RadixThemesBox,{css:({ ["width"] : "50px", ["height"] : "5px", ["background"] : "linear-gradient(90deg, #00FF88, #00D4FF)", ["borderRadius"] : "3px", ["margin"] : "12px auto", ["cursor"] : "pointer", ["boxShadow"] : "0 0 10px rgba(0,255,136,0.5)" }),onClick:on_click_2699ddb109a9535e76dfa355f8bfd640},)
  )
}


function Text_be6ca664186adb8f1012b2d59379c9a4 () {
  const reflex___state____state__senor_scout___senor_scout____state = useContext(StateContexts.reflex___state____state__senor_scout___senor_scout____state)



  return (
    jsx(RadixThemesText,{as:"p",css:({ ["color"] : "white", ["fontSize"] : "20px", ["fontWeight"] : "bold", ["letterSpacing"] : "0.5px" })},(isTrue(reflex___state____state__senor_scout___senor_scout____state.search_result_rx_state_?.["keyword"]) ? reflex___state____state__senor_scout___senor_scout____state.search_result_rx_state_?.["keyword"] : "ITEM"))
  )
}


function Text_cb1097e42e4649265255ad894ad7afc8 () {
  const reflex___state____state__senor_scout___senor_scout____state = useContext(StateContexts.reflex___state____state__senor_scout___senor_scout____state)



  return (
    jsx(RadixThemesText,{as:"p",css:({ ["color"] : "#00FF88", ["fontSize"] : "40px", ["fontWeight"] : "bold", ["textShadow"] : "0 0 20px rgba(0,255,136,0.5)" })},("R"+(reflex___state____state__senor_scout___senor_scout____state.zar_price_rx_state_.toLocaleString('en-US', ((decimals) => ({minimumFractionDigits: decimals, maximumFractionDigits: decimals}))(2)).replaceAll(',', ""))))
  )
}


function Text_0fa991ea5690c1b2121b2308c7bd8eb9 () {
  const reflex___state____state__senor_scout___senor_scout____state = useContext(StateContexts.reflex___state____state__senor_scout___senor_scout____state)



  return (
    jsx(RadixThemesText,{as:"p",css:({ ["color"] : "rgba(255,255,255,0.7)", ["fontSize"] : "20px" })},("$"+(isTrue(reflex___state____state__senor_scout___senor_scout____state.search_result_rx_state_?.["average_price"]) ? reflex___state____state__senor_scout___senor_scout____state.search_result_rx_state_?.["average_price"] : 0)))
  )
}


function Text_6a77e6323902cb448159d215d9a921a8 () {
  const reflex___state____state__senor_scout___senor_scout____state = useContext(StateContexts.reflex___state____state__senor_scout___senor_scout____state)



  return (
    jsx(RadixThemesText,{as:"p"},((isTrue(reflex___state____state__senor_scout___senor_scout____state.search_result_rx_state_?.["num_listings"]) ? reflex___state____state__senor_scout___senor_scout____state.search_result_rx_state_?.["num_listings"] : 0)+" listings"))
  )
}


function Badge_ab4b8d3d325ac585dfab69a4cc58fdea () {
  const reflex___state____state__senor_scout___senor_scout____state = useContext(StateContexts.reflex___state____state__senor_scout___senor_scout____state)



  return (
    jsx(RadixThemesBadge,{color:"cyan"},(reflex___state____state__senor_scout___senor_scout____state.compare_items_rx_state_.length+"/3"))
  )
}


function Text_85519fa4eb672d2140701893c91652f3 () {
  const reflex___state____state__senor_scout___senor_scout____state = useContext(StateContexts.reflex___state____state__senor_scout___senor_scout____state)



  return (
    jsx(RadixThemesText,{as:"p",css:({ ["color"] : "white", ["fontSize"] : "sm" })},(isTrue(reflex___state____state__senor_scout___senor_scout____state.compare_items_rx_state_?.at?.(0)?.["keyword"]) ? reflex___state____state__senor_scout___senor_scout____state.compare_items_rx_state_?.at?.(0)?.["keyword"] : ""))
  )
}


function Text_23da3d06d8911b2f914a00e60fee25fa () {
  const reflex___state____state__senor_scout___senor_scout____state = useContext(StateContexts.reflex___state____state__senor_scout___senor_scout____state)



  return (
    jsx(RadixThemesText,{as:"p",css:({ ["color"] : "#00FF88", ["fontWeight"] : "bold" })},("R"+(isTrue(reflex___state____state__senor_scout___senor_scout____state.compare_items_rx_state_?.at?.(0)?.["zar_price"]) ? reflex___state____state__senor_scout___senor_scout____state.compare_items_rx_state_?.at?.(0)?.["zar_price"] : 0)))
  )
}


function Fragment_b8dcbb03dfcab6135873437b89c7eaf0 () {
  const reflex___state____state__senor_scout___senor_scout____state = useContext(StateContexts.reflex___state____state__senor_scout___senor_scout____state)



  return (
    jsx(Fragment,{},((reflex___state____state__senor_scout___senor_scout____state.compare_items_rx_state_.length > 0)?(jsx(Fragment,{},jsx(RadixThemesBox,{css:({ ["background"] : "rgba(0,255,136,0.1)", ["borderRadius"] : "12px", ["padding"] : "12px", ["border"] : "1px solid rgba(0,255,136,0.3)" })},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",direction:"column",gap:"1"},jsx(Text_85519fa4eb672d2140701893c91652f3,{},),jsx(Text_23da3d06d8911b2f914a00e60fee25fa,{},))))):(jsx(Fragment,{},jsx(RadixThemesBox,{},)))))
  )
}


function Button_a380571685b52465fbadf1467a497ec6 () {
  const [addEvents, connectErrors] = useContext(EventLoopContext);

const on_click_5bc3ace60d70427b68392cbc989203ac = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.senor_scout___senor_scout____state.add_to_compare", ({  }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])

  return (
    jsx(RadixThemesButton,{css:({ ["background"] : "linear-gradient(135deg, #00FF88, #00CC6A)", ["borderRadius"] : "16px", ["padding"] : "16px 32px", ["border"] : "none", ["cursor"] : "pointer", ["boxShadow"] : "0 8px 25px #00FF8866, 0 0 20px #00FF8833", ["transition"] : "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)", ["&:hover"] : ({ ["transform"] : "translateY(-3px) scale(1.02)", ["boxShadow"] : "0 15px 35px #00FF8888, 0 0 30px #00FF8855" }), ["&:active"] : ({ ["transform"] : "translateY(-1px) scale(0.98)" }) }),onClick:on_click_5bc3ace60d70427b68392cbc989203ac},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",direction:"row",gap:"3"},jsx(LucidePlus,{css:({ ["color"] : "white" })},),jsx(RadixThemesText,{as:"p",css:({ ["color"] : "white", ["fontWeight"] : "bold" })},"Add")))
  )
}


function Button_bd470fca8bbcb28f6a4202127908d55d () {
  const [addEvents, connectErrors] = useContext(EventLoopContext);

const on_click_c932ec905682feb0c6ed989edeaf4486 = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.senor_scout___senor_scout____state.clear_compare", ({  }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])

  return (
    jsx(RadixThemesButton,{color:"red",onClick:on_click_c932ec905682feb0c6ed989edeaf4486,variant:"soft"},"Clear")
  )
}


function Fragment_6508a7ff4004f176e9ac4393a9bfef61 () {
  const reflex___state____state__senor_scout___senor_scout____state = useContext(StateContexts.reflex___state____state__senor_scout___senor_scout____state)



  return (
    jsx(Fragment,{},(reflex___state____state__senor_scout___senor_scout____state.compare_active_rx_state_?(jsx(Fragment,{},jsx(RadixThemesBox,{css:({ ["background"] : "linear-gradient(135deg, rgba(30,58,42,0.85), rgba(22,42,30,0.75))", ["borderRadius"] : "24px", ["border"] : "1px solid #00D4FF40", ["backdropFilter"] : "blur(20px)", ["padding"] : "24px", ["boxShadow"] : "0 8px 32px #00D4FF20, inset 0 1px 0 rgba(255,255,255,0.1)", ["transition"] : "all 0.3s ease", ["&:hover"] : ({ ["transform"] : "translateY(-4px)", ["boxShadow"] : "0 12px 40px #00D4FF40, inset 0 1px 0 rgba(255,255,255,0.2)", ["border"] : "1px solid #00D4FF60" }) })},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",direction:"column",gap:"3"},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["width"] : "100%" }),direction:"row",justify:"between",gap:"3"},jsx(RadixThemesText,{as:"p",css:({ ["color"] : "white", ["fontWeight"] : "bold", ["fontSize"] : "lg" })},"Compare"),jsx(Badge_ab4b8d3d325ac585dfab69a4cc58fdea,{},)),jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",direction:"row",gap:"3",wrap:"wrap"},jsx(Fragment_b8dcbb03dfcab6135873437b89c7eaf0,{},)),jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",direction:"row",gap:"2"},jsx(Button_a380571685b52465fbadf1467a497ec6,{},),jsx(Button_bd470fca8bbcb28f6a4202127908d55d,{},)))))):(jsx(Fragment,{},jsx(RadixThemesBox,{},)))))
  )
}


function Button_0f4720cb449453d19d274ae50a2966ba () {
  const reflex___state____state__senor_scout___senor_scout____state = useContext(StateContexts.reflex___state____state__senor_scout___senor_scout____state)
const [addEvents, connectErrors] = useContext(EventLoopContext);

const on_click_fd196b4da1c436ac9ec6744bd7b3aa11 = useCallback(((_e) => (addEvents([(ReflexEvent("reflex___state____state.senor_scout___senor_scout____state.toggle_compare", ({  }), ({  })))], [_e], ({  })))), [addEvents, ReflexEvent])

  return (
    jsx(RadixThemesButton,{color:(reflex___state____state__senor_scout___senor_scout____state.compare_active_rx_state_ ? "cyan" : "gray"),onClick:on_click_fd196b4da1c436ac9ec6744bd7b3aa11,size:"2"},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",direction:"row",gap:"3"},jsx(LucideGitCompare,{},),jsx(RadixThemesText,{as:"p"},"Compare")))
  )
}


function Box_00212946ed8d92e5e69d999b23634578 () {
  const reflex___state____state__senor_scout___senor_scout____state = useContext(StateContexts.reflex___state____state__senor_scout___senor_scout____state)



  return (
    jsx(RadixThemesBox,{css:({ ["position"] : "fixed", ["bottom"] : "0", ["left"] : "0", ["right"] : "0", ["background"] : "linear-gradient(180deg, rgba(10,10,26,0.98), rgba(10,10,26,1))", ["borderRadius"] : "30px 30px 0 0", ["borderTop"] : "2px solid rgba(0,255,136,0.4)", ["backdropFilter"] : "blur(30px)", ["zIndex"] : "100", ["maxHeight"] : (reflex___state____state__senor_scout___senor_scout____state.sheet_expanded_rx_state_ ? "75vh" : "180px"), ["overflowY"] : "auto", ["boxShadow"] : "0 -10px 40px rgba(0,0,0,0.5)" })},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["padding"] : "20px" }),direction:"column",gap:"4"},jsx(Box_e8bfcd2e15c17139544a206a0e49d3fe,{},),jsx(RadixThemesBox,{css:({ ["background"] : "linear-gradient(145deg, rgba(30,58,42,0.9), rgba(22,42,30,0.85))", ["borderRadius"] : "24px", ["border"] : "2px solid rgba(0,255,136,0.3)", ["padding"] : "24px", ["backdropFilter"] : "blur(20px)", ["transformStyle"] : "preserve-3d", ["transition"] : "transform 0.3s ease, box-shadow 0.3s ease", ["&:hover"] : ({ ["transform"] : "rotateX(5deg) rotateY(-5deg) translateZ(20px)", ["boxShadow"] : "0 25px 50px rgba(0,255,136,0.2), 0 0 30px rgba(0,255,136,0.1)" }) })},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["width"] : "100%" }),direction:"column",gap:"4"},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",direction:"row",gap:"4"},jsx(RadixThemesBox,{css:({ ["background"] : "linear-gradient(135deg, #00FF88, #00D4FF)", ["borderRadius"] : "12px", ["padding"] : "12px", ["boxShadow"] : "0 4px 15px rgba(0,255,136,0.4)" })},jsx(LucideShoppingBag,{css:({ ["color"] : "white" }),size:20},)),jsx(Text_be6ca664186adb8f1012b2d59379c9a4,{},)),jsx(RadixThemesSeparator,{css:({ ["borderColor"] : "rgba(255,255,255,0.1)" }),size:"4"},),jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["width"] : "100%" }),direction:"row",justify:"between",gap:"3"},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",direction:"column",gap:"0"},jsx(RadixThemesText,{as:"p",css:({ ["color"] : "rgba(255,255,255,0.5)", ["fontSize"] : "12px" })},"ZAR"),jsx(Text_cb1097e42e4649265255ad894ad7afc8,{},)),jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",direction:"column",gap:"0"},jsx(RadixThemesText,{as:"p",css:({ ["color"] : "rgba(255,255,255,0.5)", ["fontSize"] : "12px" })},"USD"),jsx(Text_0fa991ea5690c1b2121b2308c7bd8eb9,{},))),jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",direction:"row",gap:"2",wrap:"wrap"},jsx(RadixThemesBadge,{color:"green",size:"2"},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",direction:"row",gap:"1"},jsx(LucideBarChart,{size:14},),jsx(Text_6a77e6323902cb448159d215d9a921a8,{},))),jsx(RadixThemesBadge,{color:"blue",size:"2"},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",direction:"row",gap:"1"},jsx(LucideStore,{size:14},),jsx(RadixThemesText,{as:"p"},"Multi-source")))))),jsx(Fragment_6508a7ff4004f176e9ac4393a9bfef61,{},),jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",direction:"row",gap:"2",wrap:"wrap"},jsx(Button_0f4720cb449453d19d274ae50a2966ba,{},),jsx(RadixThemesButton,{color:"blue",size:"2"},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",direction:"row",gap:"3"},jsx(LucideShare2,{},),jsx(RadixThemesText,{as:"p"},"Share"))),jsx(RadixThemesButton,{color:"green",size:"2"},jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",direction:"row",gap:"3"},jsx(LucideBookmark,{},),jsx(RadixThemesText,{as:"p"},"Save"))))))
  )
}


function Fragment_83a4c40a00b767c96bf0a491e39e87f4 () {
  const reflex___state____state__senor_scout___senor_scout____state = useContext(StateContexts.reflex___state____state__senor_scout___senor_scout____state)



  return (
    jsx(Fragment,{},(isTrue(reflex___state____state__senor_scout___senor_scout____state.search_result_rx_state_)?(jsx(Fragment,{},jsx(Box_00212946ed8d92e5e69d999b23634578,{},))):(jsx(Fragment,{},jsx(RadixThemesBox,{},)))))
  )
}


function Box_6d2dfb7a2a863019ffcf0fa229130cc9 () {
  
                useEffect(() => {
                    ((...args) => (addEvents([(ReflexEvent("reflex___state____state.senor_scout___senor_scout____state.on_mount", ({  }), ({  })))], args, ({  }))))()
                    return () => {
                        
                    }
                }, []);
const [addEvents, connectErrors] = useContext(EventLoopContext);
const reflex___state____state__senor_scout___senor_scout____state = useContext(StateContexts.reflex___state____state__senor_scout___senor_scout____state)



  return (
    jsx(RadixThemesBox,{},jsx(RadixThemesBox,{css:({ ["position"] : "fixed", ["top"] : "0", ["left"] : "0", ["width"] : "100%", ["height"] : "100%", ["background"] : "linear-gradient(-45deg, #0A0A1A, #1A1A3E, #162A4A, #0A0A1A)", ["backgroundSize"] : "400% 400%", ["animation"] : "gradientBG 15s ease infinite", ["zIndex"] : "-3" })},),jsx(RadixThemesBox,{css:({ ["position"] : "fixed", ["top"] : "15%", ["left"] : "5%", ["width"] : "400px", ["height"] : "400px", ["background"] : "radial-gradient(circle, rgba(0,212,255,0.2) 0%, transparent 70%)", ["borderRadius"] : "50%", ["filter"] : "blur(60px)", ["animation"] : "floatOrb1 20s ease-in-out infinite", ["zIndex"] : "-2" })},),jsx(RadixThemesBox,{css:({ ["position"] : "fixed", ["bottom"] : "10%", ["right"] : "5%", ["width"] : "500px", ["height"] : "500px", ["background"] : "radial-gradient(circle, rgba(0,255,136,0.15) 0%, transparent 70%)", ["borderRadius"] : "50%", ["filter"] : "blur(80px)", ["animation"] : "floatOrb2 25s ease-in-out infinite reverse", ["zIndex"] : "-2" })},),Array.prototype.map.call(reflex___state____state__senor_scout___senor_scout____state.particles_rx_state_ ?? [],((p_rx_state_,index_b1f6ed3d37d3e6e366767f49fbf52be4)=>(jsx(RadixThemesBox,{css:({ ["position"] : "fixed", ["left"] : ((isTrue(p_rx_state_?.["x"]) ? p_rx_state_?.["x"] : 50)+"%"), ["top"] : ((isTrue(p_rx_state_?.["y"]) ? p_rx_state_?.["y"] : 50)+"%"), ["width"] : ((isTrue(p_rx_state_?.["size"]) ? p_rx_state_?.["size"] : 3)+"px"), ["height"] : ((isTrue(p_rx_state_?.["size"]) ? p_rx_state_?.["size"] : 3)+"px"), ["background"] : "radial-gradient(circle, rgba(0,212,255,0.8), transparent)", ["borderRadius"] : "50%", ["animation"] : ("floatParticle "+(isTrue(p_rx_state_?.["duration"]) ? p_rx_state_?.["duration"] : 15)+"s ease-in-out infinite"), ["animationDelay"] : ((isTrue(p_rx_state_?.["delay"]) ? p_rx_state_?.["delay"] : 0)+"s"), ["pointerEvents"] : "none", ["zIndex"] : "-1" }),key:index_b1f6ed3d37d3e6e366767f49fbf52be4},)))),jsx(Fragment_f522ccc0087caa97467e4925e9b1a7d3,{},),jsx(RadixThemesFlex,{align:"start",className:"rx-Stack",css:({ ["width"] : "100%", ["minHeight"] : "100vh" }),direction:"column",gap:"0"},jsx(RadixThemesBox,{css:({ ["position"] : "sticky", ["top"] : "0", ["zIndex"] : "50", ["background"] : "rgba(10,10,26,0.8)", ["backdropFilter"] : "blur(20px)", ["padding"] : "16px 24px", ["borderBottom"] : "1px solid rgba(0,255,136,0.2)" })},jsx(RadixThemesFlex,{align:"center",className:"rx-Stack",css:({ ["width"] : "100%" }),direction:"row",justify:"between",gap:"3"},jsx(RadixThemesHeading,{css:({ ["background"] : "linear-gradient(90deg, #00D4FF, #00FF88)", ["backgroundClip"] : "text", ["color"] : "transparent", ["fontSize"] : "1.8rem", ["fontWeight"] : "bold", ["textShadow"] : "0 0 30px rgba(0,212,255,0.5)" })},"\ud83d\udcf8 SenorScout"),jsx(Fragment_0bc5e02f734ddf89cb9ad57f24f29431,{},),jsx(Button_171a133c001e304598c2e5216de6c8b2,{},))),jsx(Fragment_67d4a03bf9e13c625cdc0e966d6a28ef,{},),jsx(Fragment_4bf4111926a0307112a17ae732198d35,{},)),jsx(RadixThemesBox,{css:({ ["position"] : "fixed", ["bottom"] : "40px", ["right"] : "40px", ["zIndex"] : "1000" })},jsx(RadixThemesFlex,{align:"center",className:"rx-Stack",direction:"column",gap:"3"},jsx(Fragment_a76f50e2ceed05cf218b815c94db7982,{},),jsx(Button_cd6ea976cf2bcd421956cbbcdbd7a8b7,{},))),jsx(Fragment_83a4c40a00b767c96bf0a491e39e87f4,{},),jsx("style",{suppressHydrationWarning:true},"\n            @keyframes gradientBG {\n                0% { background-position: 0% 50%; }\n                50% { background-position: 100% 50%; }\n                100% { background-position: 0% 50%; }\n            }\n            @keyframes floatOrb1 {\n                0%, 100% { transform: translate(0, 0) scale(1); }\n                50% { transform: translate(30px, -30px) scale(1.1); }\n            }\n            @keyframes floatOrb2 {\n                0%, 100% { transform: translate(0, 0) scale(1); }\n                50% { transform: translate(-40px, 20px) scale(0.9); }\n            }\n            @keyframes floatParticle {\n                0%, 100% { transform: translateY(0) translateX(0); opacity: 0.3; }\n                50% { transform: translateY(-100px) translateX(50px); opacity: 0.8; }\n            }\n            @keyframes shimmer {\n                0% { background-position: -200% 0; }\n                100% { background-position: 200% 0; }\n            }\n            @keyframes slideInRight {\n                from { transform: translateX(100%); opacity: 0; }\n                to { transform: translateX(0); opacity: 1; }\n            }\n            @keyframes popIn {\n                from { transform: scale(0) translateY(20px); opacity: 0; }\n                to { transform: scale(1) translateY(0); opacity: 1; }\n            }\n            "))
  )
}


export default function Component() {





  return (
    jsx(Fragment,{},jsx(Box_6d2dfb7a2a863019ffcf0fa229130cc9,{},),jsx("title",{},"SenorScout - AI Price Scanner"),jsx("meta",{content:"favicon.ico",property:"og:image"},))
  )
}