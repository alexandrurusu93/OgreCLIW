 

function Item(loc, sizeX, sizeY, rotation, zIn, position, alpha) {  
  this.loc = loc;
  this.sizeX = sizeX;
  this.sizeY = sizeY;
  this.rotation = rotation;
  this.position = position;
  this.alpha = alpha;
  this.zIn = zIn;
}

// noi metode adaugate la prototip
Item.prototype.getLoc = function() {
  return this.loc;
};
Item.prototype.getSizeX = function() {
  return this.sizeX;
};
Item.prototype.getSizeY = function () {   
  return this.sizeY;
};
Item.prototype.toString = function () { // suprascriere
  return '<Item>' + this.loc () + '</Item>';
};


var selectedItem = -1;
var drag = false;
var copyElement = -1;
var relativeX;
var relativeY;

Items = {
    initialization: function() {
      Items.drag($(".ui-widget"));
    },
    reset: function() {
      $(".ui-widget").removeAttr( "id" );
      selectedItem = -1;
    },
    drag: function(selector) {
      selector.draggable({
          start: function() {
              //Items.select($(this));
          },
          drag: function() {
              //$( "#contextmenu" ).appendTo($("#mini"));
          },
          stop: function() {
              //$(this).removeAttr( "id" );
          }
      });
    },
    select: function(newItem) {
        if (selectedItem != -1) {
           if (!selectedItem.is(newItem)) {
              selectedItem.removeAttr('id');
           }
        }
        selectedItem = newItem;
        newItem.attr('id', 'drag');

        if (!newItem.hasClass("textItem")) {
          $('#width').val(newItem.children('img').width() + "px." );
          $('#height').val(newItem.children('img').height() + "px.");
        }

        $( "#amount" ).val( newItem.children('img').css('opacity') );
        $('#slider-1').slider("value", newItem.children('img').css('opacity') * 100);
    }
};

$( document ).ready(function() {
    /* Slider */
    $( "#slider-1" ).slider({
        min: 0,
        max: 100,
        value: 100,
        slide: function( event, ui ) {
            $( "#amount" ).val( ui.value/100 );
            selectedItem.children('img').css("opacity", ui.value/100);
        }
    });

    //$( "#amount" ).val( $( "#slider-vertical" ).slider( "value" ) );

    Items.initialization();

    $(document).on("mousedown", ".draggble" , function() {
      Items.select($(this));
    });
    //$( ".ui-widget" ).addcontextmenu('contextmenu2');
    //$( ".items" ).selectable();

    // starting position of the divs
    $( document ).mouseup(function() {
       $( "#contextmenu" ).appendTo($("#mini"));
       $( "#contextmenu2" ).appendTo($("#mini"));
    });

    /* MenuContext */
    $(document).on("contextmenu", ".items" , function(e) {
        e.preventDefault();
        var offset = $(this).offset();
        relativeX = (e.pageX - offset.left);
        relativeY = (e.pageY - offset.top);

        $( "#contextmenu2" ).prependTo( $(this) );
        $( "#contextmenu2" ).css("left", relativeX);
        $( "#contextmenu2" ).css("top", relativeY);
    });

    $(document).on("contextmenu", ".items div", function(e) {
        e.preventDefault();
        e.stopPropagation();
        // create and show menu
        $( "#contextmenu" ).prependTo( $(this) );
    });

    $('#flipH').click(function() {
        selectedItem.children().toggleClass('flip-horizontal');
    });

    $('#flipV').click(function() {
        selectedItem.children().toggleClass('flip-vertical');
    });

    $('.textItem').dblclick(function() {
      alert('db');
    });

    $( "#mCut" ).click(function() {
        ContextMenu.Cut();
    });

    $( "#mCopy" ).click(function() {
        ContextMenu.Copy();
    });

    $( "#mDelete" ).click(function() {
        ContextMenu.Delete();
    });

    $( "#mPaste" ).click(function() {
        ContextMenu.Paste();
    });

    $( "#mLock" ).click(function() {
        ContextMenu.Lock();
    });

    $( "#mUnlock" ).click(function() {
        ContextMenu.Unlock();
    });
});

ContextMenu = {
    Cut: function() {
      copyElement = selectedItem.clone();
      selectedItem.remove();
    },
    Copy: function() {
      $( "#contextmenu" ).appendTo($("#mini"));
      copyElement = selectedItem.clone();
    },
    Delete: function() {
      $( "#contextmenu" ).appendTo($("#mini"));
      selectedItem.remove();
      selectedItem = -1;
    },
    Paste: function() {
        copyElement.appendTo( selectedBlock.find( ".items" ) );
        copyElement.css("left", relativeX);
        copyElement.css("top", relativeY);
        Items.drag(copyElement);
        Items.reset();
        selectedItem = -1;
    },
    Lock: function() {
      selectedItem.addClass( 'locked' );
      selectedItem.draggable( 'disable' );
      $( "#contextmenu" ).appendTo($("#mini"));
      $( "#mLock" ).css("display", "none");
      $( "#mUnlock" ).css("display", "block");
    },
    Unlock: function() {
      selectedItem.removeClass( 'locked' );
      selectedItem.draggable( 'enable' );
      $( "#contextmenu" ).appendTo($("#mini"));
      $( "#mLock" ).css("display", "block");
      $( "#mUnlock" ).css("display", "none");     
    },
}