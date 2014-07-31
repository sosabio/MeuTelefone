/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicity call 'app.receivedEvent(...);'
    onDeviceReady: function() {
      app.receivedEvent('deviceready');
      app.conectado();
      window.addEventListener("batterycritical", app.battCrit, false);
      window.addEventListener("batterylow", app.battLow, false);
      window.addEventListener("batterystatus", app.battStat, false);
      app.contato();
    },

    contato: function(){
      var options = new ContactFindOptions();
      options.filter = "";
      options.multiple=true;    // return multiple results
      var filter = ["displayName"];
      navigator.contacts.find(filter, app.onSuccessContato, app.onErrorContato, options);
    },

    onSuccessContato: function(contacts) {
      for (var i = 0; i < contacts.length; i++) {
        alert(contacts[i].displayName);
      }
    },
    
    onErrorContato: function(contactError) {
      alert('onErrorContato!');
    },
    
    battCrit: function(info) {
      //navigator.notification.alert("Your battery is SUPER low!");
      app.drawStatus(info);
    },
    battLow: function(info) {
      //navigator.notification.alert("Your battery is low!");
      app.drawStatus(info);
    },

    battStat: function(info) {
      app.drawStatus(info);
    },

    conectado: function(){
      var networkState = navigator.connection.type;

      var states = {};
      states[Connection.UNKNOWN]  = 'Unknown connection';
      states[Connection.ETHERNET] = 'Ethernet connection';
      states[Connection.WIFI]     = 'WiFi connection';
      states[Connection.CELL_2G]  = 'Cell 2G connection';
      states[Connection.CELL_3G]  = 'Cell 3G connection';
      states[Connection.CELL_4G]  = 'Cell 4G connection';
      states[Connection.CELL]     = 'Cell generic connection';
      states[Connection.NONE]     = 'No network connection';

      console.log('Tipo da conexao: ' + states[networkState]);
      document.getElementById('conexao').innerHTML = 'Tipo da conexao: ' + states[networkState];
    },

    drawStatus: function(info){
      var s = "<p><b>Status da bateria.</b><br/>";
      s += "Nivel: "+info.level + "<br/>";
      s += "Plugged in is "+info.isPlugged;
      s += "</p>";
      document.getElementById('bateria').innerHTML = s;
    },

    // Update DOM on a Received Event
    receivedEvent: function(id) {
      var parentElement = document.getElementById(id);
      var listeningElement = parentElement.querySelector('.listening');
      var receivedElement = parentElement.querySelector('.received');

      listeningElement.setAttribute('style', 'display:none;');
      receivedElement.setAttribute('style', 'display:block;');
    }
};
