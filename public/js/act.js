(function(win, $) {

    // function clone
    function clone(src, out) {
        for(let attr in src.prototype) {
            out.prototype[attr] = src.prototype[attr];
        }
    }
    
    function Shape(){
        this.item = $('<div class="circle"></div>');
    }

    Shape.prototype.color = function(color) {
        this.item.css('background', color);
    }
    Shape.prototype.move = function(left, top) {
        this.item.css('left', left);
        this.item.css('top', top);
    }
    
    Shape.prototype.get =  function() {
        return this.item;
    } 

    function Rect(){
        this.item = $('<div class="rect"></div>');
    }

    clone(Shape, Rect);

    function selfDestructDecorator(obj) {
        obj.item.click(function() {
            obj.kill();
        });
        obj.kill = function() {
            obj.item.remove();
        }   
    }

    function RedShapeBuilder() {
        this.item = new Shape();
        this.init();
    }
    RedShapeBuilder.prototype.get = function () {
        return this.item
    }   

    function BlueShapeBuilder() {
        this.item = new Shape();
        this.init();
    }   

    BlueShapeBuilder.prototype.init = function() {
        this.item.color = 'blue';    
    
        let rect = new Rect()
            rect.color('yellow');
            rect.move(40, 40);
            selfDestructDecorator(rect);
        this.item.get().append(rect.get()); 
    
    }; 
        
    BlueShapeBuilder.prototype.get = function() {
        return this.item;    
    }
        
    ShapeFactory = function() {
        this.types = {};
        this.create = function(type) {
             return new this.types[type]().get();
        }    
        this.register = function(type, cls) {
            // pour correspondre au standard interface  // elles doivent avoir la fonction create
            if(cls.prototype.init && cls.prototype.get) {
                this.types[type] = cls; 
             }
        } 
    };
    function StageAdapter(id) {
        this.index = 0;
        this.context = $(id);
    }
    StageAdapter.prototype.SIG = 'stageItem'
    
    StageAdapter.prototype.add = function(item) {
        ++this.index;
        item.addClass(this.SIG + this.index);
        this.context.append(item);   
    }

    StageAdapter.prototype.remove = function(index) {
        this.context.remove('.' + this.SIG + index);
    }

         
    function CompositeController(a) {
        this.a = a; 
    }

    CompositeController.prototype.action = function(act) {
        // to tranforme pseudo array arguments to realy array witjh all methods shift pop 
        var args = Array.prototype.slice.call(arguments);
        // to ignore first act // which is the argument of the function 'act'
        args.shift();
        for (let item in this.a) {
           this.a[item][act].apply(this.a[item], args); 
        }
    }  

// Creation of Singleton 



    const ShapeGeneratorSingleton = (function() {
        var instance;
        function init() {
            var _aCircle = [],
            _stage,
            // we abstract this variable by creating function to assingn when to add shapes 
                _sf = new ShapeFactory(),
                _cc = new CompositeController(_aCircle);
            
            function _position(shape, left, top) {
                shape.move(left, top);
            }
    
            function move(left, top) {
                shape.css('left', left);
                shape.css('top', top);
            }

            function setStage(stg) {
                _stage = stg; 
            }

    // function to register our shapes 
            
            function registerShape(name, cls ){
                _sf.register(name, cls);
            }

            function create(left, top, type) {
                var shape = _sf.create(type).item
                shape.move(left, top);
                return shape;    
            } 
            
            function add(shape) {
                _stage.add(shape.get());
                _aCircle.push(shape);
            
            }

            function tint(clr) {
                __cc.action('color', clr);
            }

            function move(left, top) {
                __cc.action('move', left, top);

            }

            
            function index(){
                return _aCircle.length;
            }
 
            return {
                index: index,
                create: create,
                add: add,
                register: registerShape,
                setStage:setStage,  
                tint: tint,
                move: move
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
        const sg = ShapeGeneratorSingleton.getInstance()
            sg.register('red',RedShapeBuilder)
            sg.register('blue', BlueShapeBuilder)
            sg.setStage(new StageAdapter('.advert'));
            $('#container').click(function(e) {
                let shape = sg.create(e.pageX-25, e.pageY-25, 'red');  
                sg.add(shape);
            });
        $(document).keypress(function(e) {
            if(e.key == 'a') {
                sg.add(sg.create(Math.floor(Math.random() * 500), Math.floor(Math.random() * 500),'blue')[0]);

            }
            else if(e.key == 't') {
                sg.tint('orange');

            }
            else if(e.key == 'ArrowRight') {
                sg.move('+=5px', '+=0px');

            }
            else if(e.key == 'ArrowLeft') {
                sg.move('-=5px', '+=0px');
 
            }

        })
    })
})(window, jQuery)