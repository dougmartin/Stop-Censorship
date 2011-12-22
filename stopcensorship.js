//
// stopcensorship.js
//
// Author: Doug Martin (@dougmartin or http://dougmart.in/)
//
// Usage: Add to head or body of any page to automatically censor the content to protest censorship of the Internet
//
// Licensed under the MIT license: http://www.opensource.org/licenses/mit-license.php
//
// NOTE: PLEASE DON'T HOTLINK THIS SCRIPT!
//

(function () {
	var walker, node, root, bar;
	
	function removeBar() {
		// set the no-censor cookie for this session
		document.cookie = "__REMOVE_STOP_CENSORSHIP__=1;path=/";
		
		// and reload the page
		window.location.reload();
		
		return false;
	}
	
	function addBar() {
		var baseStyles, linkStyles, stopLink, removeLink;
		
		function createStyledNode(type, text, nodeStyles) {
			var i, node, e;
			
			node = document.createElement(type);
			
			node.innerHTML = text;
			
			for (i in baseStyles) {
				if (baseStyles.hasOwnProperty(i)) {
					try {
						node.style[i] = baseStyles[i];
					}
					catch (e) {
					}
				}
			}
			
			if (nodeStyles) {
				for (i in nodeStyles) {
					if (nodeStyles.hasOwnProperty(i)) {
						node.style[i] = nodeStyles[i];
					}
				}
			}
			
			return node;
		}
		
		// create the base styles
		baseStyles = {
			"background": "#000 none repeat scroll 0% 0%",
			"borderCollapse": "separate",
			"borderSpacing": "0",
			"border": "medium none #000",
			"bottom": "auto",
			"captionSide": "top",
			"clear": "none",
			"clip": "auto",
			"color": "#fff",
			"cursor": "auto",
			"direction": "ltr",
			"display": "inline",
			"emptyCells": "show",
			"float": "none",
			"fontStyle": "normal",
			"fontVariant": "normal",
			"fontWeight": "bold",
			"fontSize": "12px",
			"fontFamily": "verdana,helvetica,arial,sans-serif",
			"height": "auto",
			"left": "auto",
			"letterSpacing": "normal",
			"lineHeight": "normal",
			"listStyle": "disc outside none",
			"margin": "0",
			"maxHeight": "none",
			"maxWidth": "none",
			"minHeight": "0",
			"minWidth": "0",
			"orphans": "2",
			"outline": "invert none medium",
			"overflow": "visible",
			"padding": "0",
			"pageBreakAfter": "auto",
			"pageBreakBefore": "auto",
			"pageBreakInside": "auto",
			"position": "static",
			"right": "auto",
			"tableLayout": "auto",
			"textAlign": "left",
			"textDecoration": "none",
			"textIndent": "0",
			"textTransform": "none",
			"top": "auto",
			"unicodeBidi": "normal",
			"verticalAlign": "baseline",
			"visibility": "visible",
			"whiteSpace": "normal",
			"widows": "2",
			"width": "auto",
			"wordSpacing": "normal",
			"zIndex": "auto"
		};
		
		// and the link styles
		linkStyles = {
			"textDecoration": "underline"
		};
		
		// add bar to top of page with link to anti-censor site and link to set cookie
		bar = createStyledNode("div", "", {
			"position": "absolute",
			"top": "0",
			"left": "0",
			"textAlign": "center",
			"margin": "0",
			"padding": "5px 0",
			"width": "100%",
			"zIndex": 2147483647
		});
		
		stopLink = createStyledNode("a", "STOP CENSORSHIP", linkStyles);
		stopLink.href = "http://americancensorship.org/";
		
		removeLink = createStyledNode("a", "Remove this", {
			"textDecoration": "underline"
		});
		removeLink.href = "#";
		removeLink.onclick = removeBar;
		
		bar.appendChild(stopLink);
		bar.appendChild(createStyledNode("span", "|", {
			"padding": "0 10px"
		}));
		bar.appendChild(removeLink);
		
		document.body.appendChild(bar);
	}
	
	function run() {
		var blackout, blackoutArray;
	
		function censorNode(node) {
			var words, i, j;
			
			// split contents on whitespace
			words = node.nodeValue.split(/\s/);
			
			// randomly replace words with black bars 
			for (i = 0, j = words.length; i < j; i++) {
				if (Math.random() < 0.5) {
					words[i] = blackoutArray.slice(0, words[i].length).join("");
				}
			}
			
			// and rejoin using just space
			node.nodeValue = words.join(" ");
		}
		
		// create a big blackout array string to pull from
		blackout = String.fromCharCode(0x2588);
		blackoutArray = [];
		while (blackoutArray.length < 1024) {
			blackoutArray.push(blackout);
		}
		
		// process all the text
		if (document.createTreeWalker) {
			walker = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT, null, false);
			while (walker.nextNode()) {
				censorNode(walker.currentNode);
			}
		}
		else {
			// do depth first traveral from "Iterative Tree Traversal" at 
			// http://stackoverflow.com/questions/2579666/getelementsbytagname-equivalent-for-textnodes
			root = document.body;
			node = root.childNodes[0];
			while (node != null) {
				if (node.nodeType == 3) {
					censorNode(node);
				}

				if (node.hasChildNodes()) {
					node = node.firstChild;
				}
				else {
					while (node.nextSibling == null && node != root) {
						node = node.parentNode;
					}
					node = node.nextSibling;
				}
			}
		}
		
		addBar();
	}
	
	// adapted from jQuery
	function onReady(callback) {

		var isReady = false;
	
		function ready() {
			if (isReady) {
				return;
			}
				
			if (!document.body) {
				return setTimeout(ready, 1);
			}

			isReady = true;
			
			callback();
		}
		
		function domContentLoaded() {
			if (document.addEventListener) {
				document.removeEventListener("DOMContentLoaded", domContentLoaded, false);
				ready();
			} 
			else if (document.attachEvent && (document.readyState === "complete")) {
				document.detachEvent("onreadystatechange", domContentLoaded);
				ready();
			}
		}
		
		function doScrollCheck() {
			if (isReady) {
				return;
			}

			try {
				document.documentElement.doScroll("left");
			} catch (e) {
				setTimeout(doScrollCheck, 1);
				return;
			}

			ready();
		}
		

		if (document.addEventListener) {
			document.addEventListener("DOMContentLoaded", domContentLoaded, false);
			window.addEventListener("load", ready, false);
		} 
		else if (document.attachEvent) {
			document.attachEvent("onreadystatechange", domContentLoaded);
			window.attachEvent("onload", ready);
			
			try {
				if ((window.frameElement === null) && document.documentElement.doScroll) {
					doScrollCheck();
				}
			} catch (e) {
			}
		}
	}
	
	// if undo-censor cookie set, return
	if (/__REMOVE_STOP_CENSORSHIP__=1/.test(document.cookie)) {
		return;
	}

	// wait for document load and then run
	if (!document.body) {
		onReady(run);
	}
	else {
		run();
	}

}());





