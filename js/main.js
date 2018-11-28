// Hello.
//
// This is The Scripts used for ___________ Theme
//
//

function main() {

(function () {
   'use strict';

   /* ==============================================
  	Testimonial Slider
  	=============================================== */ 

  	$('a.page-scroll').click(function() {
        if (location.pathname.replace(/^\//,'') == this.pathname.replace(/^\//,'') && location.hostname == this.hostname) {
          var target = $(this.hash);
          target = target.length ? target : $('[name=' + this.hash.slice(1) +']');
          if (target.length) {
            $('html,body').animate({
              scrollTop: target.offset().top - 80
            }, 900);
            return false;
          }
        }
      });

    /*====================================
    Show Menu on Book
    ======================================*/
    $(window).bind('scroll', function() {
        var navHeight = 650;
        if ($(window).scrollTop() > navHeight) {
            $('.navbar-default').addClass('on');
        } else {
            $('.navbar-default').removeClass('on');
        }
    });

    $('body').scrollspy({ 
        target: '.navbar-default',
        offset: 80
    })

  	$(document).ready(function() {
  	  $("#team").owlCarousel({
  	 
  	      navigation : false, // Show next and prev buttons
  	      slideSpeed : 300,
  	      paginationSpeed : 400,
  	      autoHeight : true,
  	      itemsCustom : [
				        [0, 1],
				        [450, 2],
				        [600, 2],
				        [700, 2],
				        [1000, 4],
				        [1200, 4],
				        [1400, 4],
				        [1600, 4]
				      ],
  	  });

  	  $("#clients").owlCarousel({
  	 
  	      navigation : false, // Show next and prev buttons
  	      slideSpeed : 300,
  	      paginationSpeed : 400,
  	      autoHeight : true,
  	      itemsCustom : [
				        [0, 1],
				        [450, 2],
				        [600, 2],
				        [700, 2],
				        [1000, 4],
				        [1200, 5],
				        [1400, 5],
				        [1600, 5]
				      ],
  	  });
  	});

  	/*====================================
    Portfolio Isotope Filter
    ======================================*/
    $(window).load(function() {
        var $container = $('#lightbox');
        $container.isotope({
            filter: '*',
            animationOptions: {
                duration: 750,
                easing: 'linear',
                queue: false
            }
        });
        $('.cat a').click(function() {
            $('.cat .active').removeClass('active');
            $(this).addClass('active');
            var selector = $(this).attr('data-filter');
            $container.isotope({
                filter: selector,
                animationOptions: {
                    duration: 750,
                    easing: 'linear',
                    queue: false
                }
            });
            return false;
        });

    });



}());


}
main();

// canvas
// https://codepen.io/pawelqcm/pen/oxPYox
(function() {

    var canvas, ctx, circ, nodes, mouse, SENSITIVITY, SIBLINGS_LIMIT, DENSITY, NODES_QTY, ANCHOR_LENGTH, MOUSE_RADIUS;
  
    // how close next node must be to activate connection (in px)
    // shorter distance == better connection (line width)
    SENSITIVITY = 100;
    // note that siblings limit is not 'accurate' as the node can actually have more connections than this value that's because the node accepts sibling nodes with no regard to their current connections this is acceptable because potential fix would not result in significant visual difference 
    // more siblings == bigger node
    SIBLINGS_LIMIT = 10;
    // default node margin
    DENSITY = 50;
    // total number of nodes used (incremented after creation)
    NODES_QTY = 0;
    // avoid nodes spreading
    ANCHOR_LENGTH = 50;
    // highlight radius
    MOUSE_RADIUS = 200;
  
    circ = 2 * Math.PI;
    nodes = [];
  
    canvas = document.getElementById('canvas');
    resizeWindow();
    mouse = {
      x: canvas.width / 2,
      y: canvas.height / 2
    };
    ctx = canvas.getContext('2d');
    if (!ctx) {
      alert("Ooops! Your browser does not support canvas :'(");
    }
  
    function Node(x, y) {
      this.anchorX = x;
      this.anchorY = y;
      this.x = Math.random() * (x - (x - ANCHOR_LENGTH)) + (x - ANCHOR_LENGTH);
      this.y = Math.random() * (y - (y - ANCHOR_LENGTH)) + (y - ANCHOR_LENGTH);
      this.vx = Math.random() * 2 - 1;
      this.vy = Math.random() * 2 - 1;
      this.energy = Math.random() * 100;
      this.radius = Math.random();
      this.siblings = [];
      this.brightness = 0;
    }
  
    Node.prototype.drawNode = function() {
      var color = "rgba(255, 255, 255, " + this.brightness + ")";
      ctx.beginPath();
      ctx.arc(this.x, this.y, 2 * this.radius + 2 * this.siblings.length / SIBLINGS_LIMIT, 0, circ);
      ctx.fillStyle = color;
      ctx.fill();
    };
  
    Node.prototype.drawConnections = function() {
      for (var i = 0; i < this.siblings.length; i++) {
        var color = "rgba(255, 255, 255, " + this.brightness + ")";
        ctx.beginPath();
        ctx.moveTo(this.x, this.y);
        ctx.lineTo(this.siblings[i].x, this.siblings[i].y);
        ctx.lineWidth = 1 - calcDistance(this, this.siblings[i]) / SENSITIVITY;
        ctx.strokeStyle = color;
        ctx.stroke();
      }
    };
  
    Node.prototype.moveNode = function() {
      this.energy -= 2;
      if (this.energy < 1) {
        this.energy = Math.random() * 100;
        if (this.x - this.anchorX < -ANCHOR_LENGTH) {
          this.vx = Math.random() * 2;
        } else if (this.x - this.anchorX > ANCHOR_LENGTH) {
          this.vx = Math.random() * -2;
        } else {
          this.vx = Math.random() * 4 - 2;
        }
        if (this.y - this.anchorY < -ANCHOR_LENGTH) {
          this.vy = Math.random() * 2;
        } else if (this.y - this.anchorY > ANCHOR_LENGTH) {
          this.vy = Math.random() * -2;
        } else {
          this.vy = Math.random() * 4 - 2;
        }
      }
      this.x += this.vx * this.energy / 100;
      this.y += this.vy * this.energy / 100;
    };
  
    function initNodes() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      nodes = [];
      for (var i = DENSITY; i < canvas.width; i += DENSITY) {
        for (var j = DENSITY; j < canvas.height; j += DENSITY) {
          nodes.push(new Node(i, j));
          NODES_QTY++;
        }
      }
    }
  
    function calcDistance(node1, node2) {
      return Math.sqrt(Math.pow(node1.x - node2.x, 2) + (Math.pow(node1.y - node2.y, 2)));
    }
  
    function findSiblings() {
      var node1, node2, distance;
      for (var i = 0; i < NODES_QTY; i++) {
        node1 = nodes[i];
        node1.siblings = [];
        for (var j = 0; j < NODES_QTY; j++) {
          node2 = nodes[j];
          if (node1 !== node2) {
            distance = calcDistance(node1, node2);
            if (distance < SENSITIVITY) {
              if (node1.siblings.length < SIBLINGS_LIMIT) {
                node1.siblings.push(node2);
              } else {
                var node_sibling_distance = 0;
                var max_distance = 0;
                var s;
                for (var k = 0; k < SIBLINGS_LIMIT; k++) {
                  node_sibling_distance = calcDistance(node1, node1.siblings[k]);
                  if (node_sibling_distance > max_distance) {
                    max_distance = node_sibling_distance;
                    s = k;
                  }
                }
                if (distance < max_distance) {
                  node1.siblings.splice(s, 1);
                  node1.siblings.push(node2);
                }
              }
            }
          }
        }
      }
    }
  
    function redrawScene() {
      resizeWindow();
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      findSiblings();
      var i, node, distance;
      for (i = 0; i < NODES_QTY; i++) {
        node = nodes[i];
        distance = calcDistance({
          x: mouse.x,
          y: mouse.y
        }, node);
        if (distance < MOUSE_RADIUS) {
          node.brightness = 1 - distance / MOUSE_RADIUS;
        } else {
          node.brightness = 0;
        }
      }
      for (i = 0; i < NODES_QTY; i++) {
        node = nodes[i];
        if (node.brightness) {
          node.drawNode();
          node.drawConnections();
        }
        node.moveNode();
      }
      requestAnimationFrame(redrawScene);
    }
  
    function initHandlers() {
      document.addEventListener('resize', resizeWindow, false);
      canvas.addEventListener('mousemove', mousemoveHandler, false);
    }
  
    function resizeWindow() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }
  
    function mousemoveHandler(e) {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
    }
  
    initHandlers();
    initNodes();
    redrawScene();
  
  })();