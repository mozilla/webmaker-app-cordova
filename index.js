var frame = document.getElementById("frame");
frame.seamless = true;
frame.src = "http://localhost:8000";

window.addEventListener("message", onMessage, false);

function onMessage (e) {
	console.log("ON MESSAGE", e)
	var evt;
	try {
		evt = JSON.parse(e);
	} catch {
		throw "Cannot parse event";
	}

	switch (evt.api) {
		case "":
			break;
	}
}