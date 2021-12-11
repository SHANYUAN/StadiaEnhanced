class Wishlist {
    get heartElement() {
        return this._heartElement;
    }
    _element; // parentElement (contianer)
    _heartElement; // heart-icon

    constructor() {
        console.debug("Initializing wishlist....")
        this._element = this._createElement()

        this._heartElement = this._createHeart();
        this._element.appendChild(this._heartElement)
    }

    // triggered when in detail-page
    show() {
        const SKU = document.location.href.split('sku/')[1].split('?')[0];
        if (enhanced_settings.wishlist.includes(SKU)) {
            this._setHeartActive()
        } else {
            this._setHeartInactive()
        }

        // show parent
        this._element.style.display = 'inline-block'
    }

    hide() {
        this._element.style.display = 'none'
        this._heartElement.innerHTML = ''
    }

    get element() {
        return this._element;
    }

    _createElement() {
        const element = document.createElement('li')
        element.id = 'enhanced_wishlistContainer'
        element.className = 'OfFb0b tj2D'
        element.style.display = 'none'

        return element
    }

    _createHeart() {
        console.log("Heart loaded")
        const element = document.createElement('div');
        element.id = 'enhanced_WishlistHeart'
        element.className = 'ROpnrd QAAyWd wJYinb'
        element.innerHTML = ''
        element.style.width = '2.5rem'
        element.style.padding = '0'
        element.style.cursor = 'pointer'
        element.style.userSelect = 'none'
        element.tabIndex = '0'

        // TODO: create method that allows additional functionality on click
        element.addEventListener('click', () => {

            const sku = this._getSKU();

            if (enhanced_settings.wishlist.includes(sku)) {
                enhanced_settings.wishlist = enhanced_settings.wishlist.replace('(' + sku + ')', '')
                this._setHeartInactive()

            } else {
                enhanced_settings.wishlist += '(' + sku + ')'
                this._setHeartActive()
            }

            // update settings
            localStorage.setItem('enhanced_' + enhanced_settings.user, JSON.stringify(enhanced_settings))
        })

        return element;
    }
    _setHeartActive() {
        this._heartElement.innerHTML = '<i class="material-icons-extended" aria-hidden="true">favorite</i>'
        this._heartElement.style.color = '#ff773d' // show as already clicked
    }

    _setHeartInactive() {
        this._heartElement.innerHTML = '<i class="material-icons-extended" aria-hidden="true">favorite_border</i>'
        this._heartElement.style.color = ''
    }

    _getSKU() {
        return document.location.href.split('sku/')[1].split('?')[0]
    }
}
