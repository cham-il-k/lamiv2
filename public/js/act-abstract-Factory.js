(function(win, $) {
    function RedCircle(){
   
    }

    RedCircle.prototype.create = function () {
        this.item = $('<div class="circle"></div>');
        return this
    }   

    function BlueCircle() {

    }
    BlueCircle.prototype.create = function() {
        this.item = $('<div class="circle" style="background: blue"></div>');
        return this;    
    }
        
    CircleFactory = function() {
        this.types = {};
        this.create = function(type) {
             return new this.types[type]().create();
        }    
        this.register = function(type, cls) {
            // pour correspondre au standard interface  // elles doivent avoir la fonction create
            if(cls.prototype.create) {
                this.types[type] = cls; 
            }
        }
        
    }
    
    const CircleGeneratorSingleton = (function() {
        var instance;
        function init() {
            var _aCircle = [],
                _stage = document.querySelector('#container');
                _cf = new CircleFactory();
                _cf.register('red', RedCircle);
                _cf.register('blue', BlueCircle);
            
            function _position(circle, left, top) {
                circle.css('left', left);
                circle.css('top', top);
            }
            
            function create(left, top, type) {
                var circle = _cf.create(type).item
                _position(circle, left, top);
                return circle;    
            } 
            
            function add(circle) {
                _stage.append(circle);
                _aCircle.push(circle);
            
            }

            function index(){
                return _aCircle.length;
            }

            return {
                index: index,
                create: create,
                init: init,
                add: add
            };
        }
        return {
            getInstance: function(){
                if (!instance) { 
                instance = init();
            }
            return instance;
           
        }
    }    
    })();
    $(win.document).ready(function(){
        $('#container').click(function(e) {
           const cg = CircleGeneratorSingleton.getInstance()
           let circle = cg.create(e.pageX-25, e.pageY-25, 'red');  
           cg.add(circle);
        });
        $(document).keypress(function(e) {
            if(e.key == 'a') {
                var cg = CircleGeneratorSingleton.getInstance();
                cg.add(cg.create(Math.floor(Math.random * 500), Math.floor(Math.random * 500),'blue')[0]);

            }
        })
    })
})(window, jQuery)