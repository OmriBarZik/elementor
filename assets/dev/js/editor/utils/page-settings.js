var ViewModule = require( 'elementor-utils/view-module' ),
	SettingsModel = require( 'elementor-models/base-settings' ),
	ControlsCSS = require( 'elementor-editor-utils/controls-css' );

module.exports = ViewModule.extend( {
	controlsCSS: null,

	collection: null,

	model: null,

	getDefaultSettings: function() {
		return {
			savedSettings: elementor.config.page_settings.settings
		};
	},

	bindEvents: function() {
		elementor.on( 'preview:loaded', this.updateStylesheet );
	},

	renderStyles: function() {
		this.controlsCSS.addStyleRules( this.model.getStyleControls(), this.model.attributes, this.model.controls, [ /\{\{WRAPPER}}/g ], [ '.elementor-page-' + elementor.config.post_id ] );
	},

	updateStylesheet: function() {
		this.controlsCSS.stylesheet.empty();

		this.renderStyles();

		this.controlsCSS.addStyleToDocument();
	},

	initModel: function() {
		this.model = new SettingsModel( this.getSettings( 'savedSettings' ), {
			controls: elementor.config.page_settings.controls
		} );
	},

	initControlsCSS: function() {
		this.controlsCSS = new ControlsCSS();
	},

	resetModel: function() {
		this.model.set( this.getSettings( 'savedSettings' ) );
	},

	onInit: function() {
		this.initModel();

		this.initControlsCSS();

		ViewModule.prototype.onInit.apply( this, arguments );
	}
} );
