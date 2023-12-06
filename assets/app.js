import './css/app.scss';

import './bootstrap.js';
import Sidebar from "./js/components/Sidebar.js";
import {FlashMessages} from "./js/components/FlashMessages.ts";
import Tooltip from "@canopee_app/assets/js/components/Tooltip";

window.addEventListener('DOMContentLoaded', () => {
	new Sidebar();
	FlashMessages.register();
	Tooltip.register();
});
