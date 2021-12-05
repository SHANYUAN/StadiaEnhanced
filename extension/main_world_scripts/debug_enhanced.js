/**
 * Function that can be called from the browser console to get debug information for the
 * extension.
 *
 * Example usage: debugEnhanced('translation');
 */

const HELP_TEXT = `
Welcome to the Stadia Enhanced debug utility!

Please specify one of the following options:
    'translation' (Displays all available translations)
    'profile' (Prints user information and settings)
    'restorelists' (???)
    'resolution' (Prints your current and maximum browser resolution)
                
For example, if you want to see all available translations use the following command: 
    debugEnhanced('translation');
`;

function debugEnhanced(opt) {
    if (opt == null) {
        console.log(HELP_TEXT)
        return
    }

    switch (opt) {

        case 'translation':
            console.groupCollapsed('Stadia Enhanced: Translation Output')
            var languages = ['fr', 'nl', 'sv', 'pt', 'ca', 'da', 'it', 'es', 'de', 'ru', 'hu', 'sk', 'eo']
            for (var i = 0; i < languages.length; i++) {
                debug_load = enhancedTranslate(languages[i], true)
            }
            console.groupEnd()
            break

        case 'profile':
            _printProfile()
            break

        case 'restorelists':
            const enhanced_activeUser = _getStadiaUsername()

            enhanced_settings = JSON.parse(localStorage.getItem('enhanced_' + enhanced_activeUser))

            if (localStorage.getItem('enhanced_gameFilter')) {
                enhanced_settings.gameFilter = localStorage.getItem('enhanced_gameFilter')
            }
            if (localStorage.getItem('enhanced_favlist')) {
                enhanced_settings.favoriteList = localStorage.getItem('enhanced_favlist')
            }
            if (localStorage.getItem('enhanced_wishlist')) {
                enhanced_settings.wishlist = localStorage.getItem('enhanced_wishlist')
            }
            localStorage.setItem('enhanced_' + enhanced_activeUser, JSON.stringify(enhanced_settings))
            location.reload()
            break

        case 'resolution':
            _printResolution()
            break

        default:
            console.log(`Unknown option '${opt}'. Available options are: 'translation', 'profile' and 'restorelists'`)
    }

    function _printProfile() {
        const username = _getStadiaUsername();
        const settings = _getEnhancedSettings(username)
        console.table(settings)
    }

    function _printResolution() {
        const dimensions = window.screen

        let description = "Native"
        if (dimensions.availHeight === 1440) {
            description = "1440p"
        } else if (dimensions.availHeight === 2160) {
            description = "2160p / 4K"
        }

        console.log(`Your current browser resolution is set to: ${dimensions.availWidth}x${dimensions.availHeight} (${description})`)
    }

    function _getStadiaUsername() {
        return document.getElementsByClassName('DlMyQd NTLMMc')[0].textContent
    }

    function _getEnhancedSettings(username) {
        return JSON.parse(localStorage.getItem('enhanced_' + username))
    }
}
