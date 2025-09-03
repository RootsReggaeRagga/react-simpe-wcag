<?php
/**
 * Plugin Name: React Simple WCAG Accessibility Widget
 * Plugin URI: https://github.com/your-username/react-simple-wcag
 * Description: A WordPress plugin that adds WCAG accessibility features using React build.
 * Version: 2.0.1
 * Author: Your Name
 * License: GPL v2 or later
 * Text Domain: react-simple-wcag
 */

// Prevent direct access
if (!defined('ABSPATH')) {
    exit;
}

// Define plugin constants
define('RSW_PLUGIN_URL', plugin_dir_url(__FILE__));
define('RSW_PLUGIN_PATH', plugin_dir_path(__FILE__));
define('RSW_PLUGIN_VERSION', '2.0.0');

class ReactSimpleWCAG {
    
    public function __construct() {
        add_action('init', array($this, 'init'));
        add_action('wp_enqueue_scripts', array($this, 'enqueue_scripts'));
        add_action('wp_footer', array($this, 'render_widget'));
        add_action('wp_head', array($this, 'add_custom_styles'));
        add_action('admin_menu', array($this, 'add_admin_menu'));
    }
    
    public function init() {
        // Load text domain for translations
        load_plugin_textdomain('react-simple-wcag', false, dirname(plugin_basename(__FILE__)) . '/languages');
    }
    
    public function enqueue_scripts() {
        // Enqueue React build files
        wp_enqueue_script('react-simple-wcag-main', RSW_PLUGIN_URL . 'build/static/js/main.13f6841d.js', array(), RSW_PLUGIN_VERSION, true);
        wp_enqueue_script('react-simple-wcag-chunk', RSW_PLUGIN_URL . 'build/static/js/453.96453769.chunk.js', array('react-simple-wcag-main'), RSW_PLUGIN_VERSION, true);
        
        // Enqueue CSS from React build
        wp_enqueue_style('react-simple-wcag', RSW_PLUGIN_URL . 'build/static/css/main.1152a6e8.css', array(), RSW_PLUGIN_VERSION);
        
        // Add inline script to initialize the widget
        wp_add_inline_script('react-simple-wcag-main', '
            // Initialize WCAG widget when DOM is ready
            document.addEventListener("DOMContentLoaded", function() {
                // The React app will automatically mount to #wcag-widget-root
                console.log("WCAG Widget: React app loaded");
                
                // Debug: Check if element exists
                const widgetRoot = document.getElementById("wcag-widget-root");
                console.log("WCAG Widget: Root element found:", widgetRoot);
                
                if (widgetRoot) {
                    console.log("WCAG Widget: Root element content:", widgetRoot.innerHTML);
                    console.log("WCAG Widget: Root element children:", widgetRoot.children.length);
                }
                
                // Check for React components
                setTimeout(() => {
                    const wcagContainer = document.querySelector(".wcag-container");
                    const toggleButton = document.querySelector(".aside-wcag__toggle");
                    console.log("WCAG Widget: Container found:", wcagContainer);
                    console.log("WCAG Widget: Toggle button found:", toggleButton);
                }, 1000);
            });
        ');
    }
    
    public function add_custom_styles() {
        $options = get_option('react_simple_wcag_options', array());
        $custom_css = isset($options['custom_css']) ? $options['custom_css'] : '';
        
        if (!empty($custom_css)) {
            echo '<style type="text/css">' . $custom_css . '</style>';
        }
        
        // Add WordPress-specific styles to ensure widget visibility
        echo '<style type="text/css">
            /* Ensure WCAG widget is visible in WordPress */
            #wcag-widget-root {
                position: fixed !important;
                top: 0 !important;
                left: 0 !important;
                z-index: 999999 !important;
                pointer-events: none !important;
            }
            
            #wcag-widget-root .wcag-container {
                pointer-events: auto !important;
            }
            
            /* WordPress admin bar adjustment */
            .admin-bar #wcag-widget-root {
                top: 32px !important;
            }
            
            @media (max-width: 782px) {
                .admin-bar #wcag-widget-root {
                    top: 46px !important;
                }
            }
        </style>';
    }
    
    public function render_widget() {
        $options = get_option('react_simple_wcag_options', array());
        $enabled = isset($options['enabled']) ? $options['enabled'] : true;
        
        if (!$enabled) {
            return;
        }
        
        // Render the React app root
        echo '<div id="root"></div>';
    }
    
    public function add_admin_menu() {
        add_options_page(
            __('WCAG Accessibility Settings', 'react-simple-wcag'),
            __('WCAG Accessibility', 'react-simple-wcag'),
            'manage_options',
            'react-simple-wcag',
            array($this, 'admin_page')
        );
    }
    
    public function admin_page() {
        $options = get_option('react_simple_wcag_options', array());
        $enabled = isset($options['enabled']) ? $options['enabled'] : true;
        $custom_css = isset($options['custom_css']) ? $options['custom_css'] : '';
        
        if (isset($_POST['submit'])) {
            $options['enabled'] = isset($_POST['enabled']) ? true : false;
            $options['custom_css'] = sanitize_textarea_field($_POST['custom_css']);
            update_option('react_simple_wcag_options', $options);
            echo '<div class="notice notice-success"><p>' . __('Settings saved successfully!', 'react-simple-wcag') . '</p></div>';
        }
        
        ?>
        <div class="wrap">
            <h1><?php _e('WCAG Accessibility Settings', 'react-simple-wcag'); ?></h1>
            <form method="post" action="">
                <table class="form-table">
                    <tr>
                        <th scope="row"><?php _e('Enable Widget', 'react-simple-wcag'); ?></th>
                        <td>
                            <label>
                                <input type="checkbox" name="enabled" value="1" <?php checked($enabled); ?> />
                                <?php _e('Enable the WCAG accessibility widget', 'react-simple-wcag'); ?>
                            </label>
                        </td>
                    </tr>
                    <tr>
                        <th scope="row"><?php _e('Custom CSS', 'react-simple-wcag'); ?></th>
                        <td>
                            <textarea name="custom_css" rows="10" cols="50" class="large-text code"><?php echo esc_textarea($custom_css); ?></textarea>
                            <p class="description"><?php _e('Add custom CSS to override default styles', 'react-simple-wcag'); ?></p>
                        </td>
                    </tr>
                </table>
                <?php submit_button(); ?>
            </form>
            
            <div class="card">
                <h2><?php _e('Widget Information', 'react-simple-wcag'); ?></h2>
                <p><?php _e('This plugin uses a React build to provide WCAG accessibility features. The widget will appear in the top-left corner of your website.', 'react-simple-wcag'); ?></p>
                <p><strong><?php _e('Features:', 'react-simple-wcag'); ?></strong></p>
                <ul>
                    <li><?php _e('Text size controls (Normal, Large, Extra Large)', 'react-simple-wcag'); ?></li>
                    <li><?php _e('High contrast mode toggle', 'react-simple-wcag'); ?></li>
                    <li><?php _e('Settings reset functionality', 'react-simple-wcag'); ?></li>
                    <li><?php _e('WCAG 2.1 compliant', 'react-simple-wcag'); ?></li>
                </ul>
            </div>
        </div>
        <?php
    }
}

// Initialize the plugin
new ReactSimpleWCAG();

// Activation hook - temporarily disabled
// register_activation_hook(__FILE__, 'react_simple_wcag_activate');

function react_simple_wcag_activate() {
    // Set default options
    $default_options = array(
        'enabled' => true,
        'custom_css' => ''
    );
    
    add_option('react_simple_wcag_options', $default_options);
}

// Deactivation hook
register_deactivation_hook(__FILE__, 'react_simple_wcag_deactivate');

function react_simple_wcag_deactivate() {
    // Clean up if needed
} 