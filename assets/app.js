import './css/app.scss';

import './bootstrap.js';
import Sidebar from "./js/components/Sidebar.js";
import UsersGroup from "./js/components/UsersGroup.js";
import Modal from "./js/components/Modal.js";
import {FlashMessages} from "./js/components/FlashMessages.ts";
import Tooltip from "@canopee_app/assets/js/components/Tooltip";

window.addEventListener('DOMContentLoaded', () => {
	new Sidebar();
	new UsersGroup();
	new Modal();
	FlashMessages.register();
	Tooltip.register();
});
