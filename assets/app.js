import './css/app.scss';

import { registerReactControllerComponents } from '@symfony/ux-react';

import './bootstrap.js';
import Sidebar from "./js/components/Sidebar.js";
import {FlashMessages} from "./js/components/FlashMessages.ts";
import Tooltip from "@canopee_app/assets/js/components/Tooltip";

window.addEventListener('DOMContentLoaded', () => {
	new Sidebar();
	FlashMessages.register();
	Tooltip.register();
});

registerReactControllerComponents(require.context('./react/controllers', true, /\.(j|t)sx?$/));
