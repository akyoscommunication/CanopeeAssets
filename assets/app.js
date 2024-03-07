import './css/app.scss';

import './bootstrap.js';
import Sidebar from "./js/components/Sidebar.js";
import Impersonate from "./js/components/Impersonate.js";
import Modal from "./js/components/Modal.js";
import {FlashMessages} from "./js/components/FlashMessages.ts";
import Tooltip from "@canopee_app/assets/js/components/Tooltip";
import HelpInfo from "@canopee_app/assets/js/components/HelpInfo";

window.addEventListener('DOMContentLoaded', () => {
	new Sidebar();
	new Modal();
	new Impersonate();

	// C'est pas ouf, voir pour init HelpInfo au changement live sur une page (exemple: bouton editer qui affiche le from et fonc les helpInfo ne sont pas init)
	window.addEventListener('click', () => {
		new HelpInfo();
	})

	FlashMessages.register();
	Tooltip.register();
});
