 
var selectedBlock = -1;
var miniMenu = document.getElementById('miniMenu');

var hover = $('<div class="hover-content"> <div class="info">  <p> Selectați </p>  </div> </div>');

$( document ).ready(function() {

    $( "#up" ).click(function() {
        MiniMenu.MoveUp();
    });

    $( "#down" ).click(function() {
        MiniMenu.MoveDown();
    });

    $( "#clone" ).click(function() {
        MiniMenu.Clone();
    });

    $( "#delete" ).click(function() {
        MiniMenu.Delete();
    });

    $( "#add" ).click(function() {
        MiniMenu.Add();
    });

    var selectBlock = function(event) {
        Items.reset();
        $("#miniMenu").css("display", "block");
        $('.block .item').removeClass('active');
        selectedBlock = $(event.target).parents('div[class^="part"]');
        selectedBlock.addClass('active');
        selectedBlock.prepend($("#miniMenu"));
        selectedBlock.children(".block").children(".hover-content").addClass("selected");
    };

    $(document).delegate('.block', 'click', function (event) {
        if (selectedBlock != -1) {
            if  (!selectedBlock.is( $(event.target).parents('div[class^="part"]') ) )  {
                selectedBlock.children(".block").children(".hover-content").removeClass("selected");
                selectedBlock.removeClass('active');
                selectBlock(event);
            }
        }
        else {
            selectBlock(event);
        }

    });

});

MiniMenu = {

    MoveDown: function() {
        selectedBlock.insertAfter(selectedBlock.next());
    },
    MoveUp: function() {
        selectedBlock.insertBefore(selectedBlock.prev());
    },
    Clone: function() {
           var newBlock = selectedBlock.clone();
           newBlock.find('div:first').remove();
           newBlock.children(".block").children(".hover-content").removeClass("selected");
           newBlock.appendTo( "#infographic" );
           newBlock.insertAfter( selectedBlock );
           Items.reset();
           Items.initialization();
    },
    Delete: function() {
        $("#mini").prepend($("#miniMenu"));
        $("#miniMenu").css("display", "none");
        selectedBlock.remove();
        selectedBlock = -1;
    },
    Add: function() {
       $('<div class="part"> <div class="block"> <div class="hover-content"> <div class="info"> <p> Selectează </p> </div></div> </div> </div>').insertAfter(selectedBlock);
    }
}


MainMenu = {
    Save: function() {
        html2canvas($("#infographic"), {
            onrendered: function(canvas) {
                // canvas is the final rendered <canvas> element
                var myImage = canvas.toDataURL("image/png");
                window.open(myImage);
            }
        });
    },
    Load: function() {

    }
}



