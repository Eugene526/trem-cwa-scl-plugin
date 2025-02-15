const { ipcRenderer } = require("electron");
class Plugin {
    #ctx;
  
    constructor(ctx) {
      this.#ctx = ctx;
    }
    init() {
        const focusButton = document.querySelector("#focus");
        if (focusButton) {
          const button = document.createElement("div");
          button.id = "cloud_button";
          button.className = "nav-bar-location";
          button.innerHTML = `
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="#e8eaed" class="bi bi-cloud-upload" viewBox="0 0 16 16">
  <path fill-rule="evenodd" d="M4.406 3.342A5.53 5.53 0 0 1 8 2c2.69 0 4.923 2 5.166 4.579C14.758 6.804 16 8.137 16 9.773 16 11.569 14.502 13 12.687 13H10a.5.5 0 0 1 0-1h2.688C13.979 12 15 10.988 15 9.773c0-1.216-1.02-2.228-2.313-2.228h-.5v-.5C12.188 4.825 10.328 3 8 3a4.53 4.53 0 0 0-2.941 1.1c-.757.652-1.153 1.438-1.153 2.055v.448l-.445.049C2.064 6.805 1 7.952 1 9.318 1 10.785 2.23 12 3.781 12H6a.5.5 0 0 1 0 1H3.781C1.708 13 0 11.366 0 9.318c0-1.763 1.266-3.223 2.942-3.593.143-.863.698-1.723 1.464-2.383"/>
</svg>

    
    
          `;
          focusButton.insertAdjacentElement("afterend", button);
          this.addClickEvent();
        }
      }
      addClickEvent() {
        const { info } = this.#ctx;
        const button = document.querySelector("#cloud_button");
        if (button) {
          button.addEventListener("click", () => {
            ipcRenderer.send("open-plugin-window", {
              pluginId: "cwa-scl",
              htmlPath: `${info.pluginDir}/CWA-scl/web/index.html`,
              options: {
                width          : 1200,
                height         : 1200,
                minWidth       : 1200,
                minHeight      : 1200,
                frame          : true,
                maximized      : true,
                webPreferences : {
                  nodeIntegration  : true,
                },
                title: "衛星雲圖",
              },
            });
          });
        }
      }
    
      
    onLoad() {
        this.init();
      const {logger} = this.#ctx;
      logger.info("CWA-scl Plugin Loaded!")
    }
  }
  
  module.exports = Plugin;