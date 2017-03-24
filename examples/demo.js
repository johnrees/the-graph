Polymer.veiledElements = ["the-graph-editor"];
window.addEventListener('polymer-ready', function() {
  "use strict";

  // Remove loading message
  document.body.removeChild( document.getElementById("loading") );

  // The graph editor
  var editor = document.getElementById('editor');

  // Component library
  var library = {
    'svgjs/draw': {
      description: '',
      icon: 'pencil',
      inports: [
        {name: 'element_id', type: 'all'},
        {name: 'width', type: 'all'},
        {name: 'height', type: 'all'}
      ],
      outports: [
        {name: 'svg', type: 'svg'}
      ]
    },
    'clipsy/offsetPolygons': {
      description: '',
      icon: 'resize',
      inports: [
        {name: 'points', type: 'all'},
        {name: 'delta', type: 'all'},
        {name: 'miter_limit', type: 'all'},
        {name: 'join_type', type: 'all'},
        {name: 'autofix', type: 'all'},
        {name: 'convert', type: 'all'}
      ],
      outports: [
        {name: 'points', type: 'svg'}
      ]
    },
    basic: {
      description: 'basic demo component',
      icon: 'eye',
      inports: [
        {'name': 'in0', 'type': 'all'},
        {'name': 'in1', 'type': 'all'},
        {'name': 'in2', 'type': 'all'}
      ],
      outports: [
        {'name': 'out', 'type': 'all'}
      ]
    },
    tall: {
      description: 'tall demo component',
      icon: 'cog',
      inports: [
        {'name': 'in0', 'type': 'all'},
        {'name': 'in1', 'type': 'all'},
        {'name': 'in2', 'type': 'all'},
        {'name': 'in3', 'type': 'all'},
        {'name': 'in4', 'type': 'all'},
        {'name': 'in5', 'type': 'all'},
        {'name': 'in6', 'type': 'all'},
        {'name': 'in7', 'type': 'all'},
        {'name': 'in8', 'type': 'all'},
        {'name': 'in9', 'type': 'all'},
        {'name': 'in10', 'type': 'all'},
        {'name': 'in11', 'type': 'all'},
        {'name': 'in12', 'type': 'all'}
      ],
      outports: [
        {'name': 'out0', 'type': 'all'}
      ]
    }
  };
  editor.$.graph.library = library;
  editor.$.graph.onNodeSelection = function(itemKey, item, toggle) { if(itemKey) { console.log(itemKey, item, toggle); window.open("", "", "width=500,height=400,menubar=no,resizable=yes,status=no,toolbar=no"); } }
  editor.$.graph.onEdgeSelection = function(itemKey, item, toggle) { if (itemKey) { console.log(itemKey, item, toggle) }}
  editor.$.graph.onEdgeSelection = function(itemKey, item, toggle) { if (itemKey) { console.log(itemKey, item, toggle) }}


  var select = document.getElementById('nodetype');
  for (var i = 0; i < Object.keys(library).length; i++) {
    var option = document.createElement('option');
    option.text = Object.keys(library).sort()[i];
    select.add(option);
  }

  // Load empty graph
  var graph = {};
  editor.graph = graph;

  var nav = document.getElementById('nav');
  nav.editor = editor;

  // Add node button
  var addnode = function () {
    var id = Math.round(Math.random()*100000).toString(36);
    var component = document.getElementById('nodetype').value; //Math.random() > 0.5 ? 'basic' : 'tall';
    var metadata = {
      label: component,
      x: Math.round(Math.random()*800),
      y: Math.round(Math.random()*600)
    };
    var newNode = editor.fbpGraph.addNode(id, component, metadata);
    // editor.graph.addEventListener('addNode', function(event) { alert('edge') })

    // var nav = document.getElementById('nav');
    // if (nav.editor === undefined) { nav.editor = editor; }

    return newNode;
  };
  document.getElementById("addnode").addEventListener("click", addnode);

  // Autolayout button
  document.getElementById("autolayout").addEventListener("click", function () {
    editor.triggerAutolayout();
  });

  // Get graph button
  document.getElementById("get").addEventListener("click", function () {
    var graphJSON = JSON.stringify(editor.fbpGraph);
    alert(graphJSON);
    //you can use the var graphJSON to save the graph definition in a file/database
  });

  document.getElementById("load").addEventListener("click", function () {
    editor.graph = JSON.parse(prompt("enter json"))
  });

  // Clear button
  document.getElementById("clear").addEventListener("click", function () {
    graph = {};
    editor.graph = graph;
    // nav.editor = editor;
  });

  // Resize to fill window and also have explicit w/h attributes
  var resize = function () {
    editor.setAttribute("width", window.innerWidth);
    editor.setAttribute("height", window.innerHeight);
  };
  window.addEventListener("resize", resize);

  resize();

});
