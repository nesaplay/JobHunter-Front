(function() {
    // Modal constructor
    this.Modal = function() {
        this.closeButton = null
        this.modal = null
        this.overlay = null
        this.transitionEnd = transitionSelect()

        var defaults = {
            className: 'fade-and-drop',
            closeButton: true,
            content: '',
            minWidth: 250,
            maxWidth: 600,
            overlay: true
        }

        if (arguments[0] && typeof arguments[0] === 'object') {
            this.options = extendDefaults(defaults, arguments[0])
        }
    }

    // Modal public
    Modal.prototype.open = function() {
        buildOut.call(this)

        // Initialize our event listeners
        initializeEvents.call(this)

        window.getComputedStyle(this.modal).height

        this.modal.className =
            this.modal.className +
            (this.modal.offsetHeight > window.innerHeight
                ? ' scotch-open scotch-anchored'
                : ' scotch-open')
        this.overlay.className = this.overlay.className + ' scotch-open'
    }

    Modal.prototype.close = function() {
        // Store the value of this
        var _ = this

        // Remove the open class name
        this.modal.className = this.modal.className.replace(' scotch-open', '')
        this.overlay.className = this.overlay.className.replace(
            ' scotch-open',
            ''
        )

        this.modal.addEventListener(this.transitionEnd, function() {
            _.modal.parentNode.removeChild(_.modal)
        })
        this.overlay.addEventListener(this.transitionEnd, function() {
            if (_.overlay.parentNode)
                _.overlay.parentNode.removeChild(_.overlay)
        })
    }

    // Modal private
    function extendDefaults(source, props) {
        var prop
        for (prop in props) {
            if (props.hasOwnProperty(prop)) {
                source[prop] = props[prop]
            }
        }
        return source
    }

    function buildOut() {
        var content, contentHolder, docFrag

        if (typeof this.options.content === 'string') {
            content = this.options.content
        } else {
            content = this.options.content.innerHTML
        }

        // Create a DocumentFragment to build with
        docFrag = document.createDocumentFragment()

        // Create modal element
        this.modal = document.createElement('div')
        this.modal.className = 'scotch-modal ' + this.options.className
        this.modal.style.minWidth = this.options.minWidth + 'px'
        this.modal.style.maxWidth = this.options.maxWidth + 'px'

        // If closeButton option is true, add a close button
        if (this.options.closeButton === true) {
            this.closeButton = document.createElement('button')
            this.closeButton.className = 'scotch-close close-button'
            this.closeButton.innerHTML = '×'
            this.modal.appendChild(this.closeButton)
        }

        // If overlay is true, add one
        if (this.options.overlay === true) {
            this.overlay = document.createElement('div')
            this.overlay.className = 'scotch-overlay ' + this.options.classname
            docFrag.appendChild(this.overlay)
        }

        // Create content area and append to modal
        contentHolder = document.createElement('div')
        contentHolder.className = 'scotch-content'
        contentHolder.innerHTML = content
        this.modal.appendChild(contentHolder)

        // Append modal to DocumentFragment
        docFrag.appendChild(this.modal)

        // Append DocumentFragment to body
        document.body.appendChild(docFrag)
    }

    function initializeEvents() {
        if (this.closeButton) {
            this.closeButton.addEventListener('click', this.close.bind(this))
        }

        if (this.overlay) {
            this.overlay.addEventListener('click', this.close.bind(this))
        }
    }

    function transitionSelect() {
        var el = document.createElement('div')
        if (el.style.WebkitTransition) return 'webkitTransitionEnd'
        if (el.style.OTransition) return 'oTransitionEnd'
        return 'transitionend'
    }
})()