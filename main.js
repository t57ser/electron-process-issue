const { app, BrowserWindow, BrowserView } = require("electron");

const init = () => {
	let browserWindow = new BrowserWindow({
		show: true,
		webPreferences: {
			affinity: "process-1", // Run all windows & BrowserViews in the same process. This reduces memory usage and speeds up load time when creating new windows on tear out.
		},
	});

	browserWindow.loadURL("file://invalid.html");
	const browserView = new BrowserView({
		webPreferences: {
			affinity: "process-1", // Run all windows & BrowserViews in the same process. This reduces memory usage and speeds up load time when creating new windows on tear out.
		}
	});

	browserView.webContents.loadURL("file://invalid.html"); // Shutdown Issues
	// browserView.webContents.loadURL("https://www.google.com"); // No shutdown issues

	browserWindow.setBrowserView(browserView);

	setTimeout(() => {
		app.quit();
	}, 5000);
};

app.on("ready", () => {
	init();
});