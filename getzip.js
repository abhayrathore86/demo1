var zipcode;
    var countrycode;
if (window.XMLHttpRequest) {
    // code for IE7+, Firefox, Chrome, Opera, Safari
    xmlhttp=new XMLHttpRequest();
  } else { // code for IE6, IE5
    xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
  }
  xmlhttp.onreadystatechange=function() {
    if (this.readyState==4 && this.status==200) {
      data=this.responseText;  
  		var allRows = data.split(/\r?\n|\r/);
      var html="<select><option value=''>Select ZipCode </option>";
      for (var singleRow = 1; singleRow < allRows.length; singleRow++) 
	  {
	    var rowCells = allRows[singleRow].split(',');
	  	html += '<option value=' + rowCells[0]  + '>' + rowCells[0] + '</option>';
	  }
	    html+="</select>";
	    //alert(html);
	      document.getElementById("zip").innerHTML=html;

    }
  }
  xmlhttp.open("GET","http://192.168.200.53/demo1/zip_code_to_county_code.csv",true);
  xmlhttp.send();


  function getZipInfo(str) {
    //alert(str);
    zipcode=str;
    if (window.XMLHttpRequest) {
    // code for IE7+, Firefox, Chrome, Opera, Safari
    xmlhttp=new XMLHttpRequest();
  } else { // code for IE6, IE5
    xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
  }
  xmlhttp.onreadystatechange=function() {
    if (this.readyState==4 && this.status==200) {
      data=this.responseText;  
      var allRows = data.split(/\r?\n|\r/);
      //var html="<select><option value=''>Select ZipCode </option>";
      for (var singleRow = 1; singleRow < allRows.length; singleRow++) 
      {
        var rowCells = allRows[singleRow].split(',');
        //console.log(rowCells[0]);

        if(zipcode == rowCells[0]){
          //console.log("inside if");
          countrycode=rowCells[1];
         // console.log(countrycode);
          break;
        }

      }
     document.getElementById('country').innerHTML=countrycode;
    }

  }
  xmlhttp.open("GET","http://192.168.200.53/demo1/zip_code_to_county_code.csv",true);
  xmlhttp.send();
  }

  function getInfo() {
    
    if (window.XMLHttpRequest) {
    // code for IE7+, Firefox, Chrome, Opera, Safari
    xmlhttp=new XMLHttpRequest();
  } else { // code for IE6, IE5
    xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
  }
  xmlhttp.onreadystatechange=function() {
    var selectHTML = "";
    var count=0;
    if (this.readyState==4 && this.status==200) {
      data=this.responseText;  
      var allRows = data.split(/\r?\n|\r/);
      //alert(allRows);
      //var table = '<table border="1">';
      for (var singleRow = 0; singleRow < allRows.length; singleRow++) {
        if (singleRow === 0) {
          //table += '<thead>';
         // table += '<tr>';
        } 
        
        var rowCells = allRows[singleRow].split(',');
        
         
        
        for (var rowCell = 0; rowCell < rowCells.length; rowCell++) {
          if (singleRow === 0) {
           // console.log(rowCells[rowCell]);
            //alert(rowCell);
            selectHTML =selectHTML + "<option value='" + rowCell + "'>" + rowCells[rowCell] + "</option>";
            //table += '<th>';
            //table += rowCells[rowCell];
            //table += '</th>';
          } else {
            var arr1;
            if(rowCells[5].includes('|')){
             
              arr1=rowCells[5].split('|');
              //console.log(rowCells[0]+" " +arr1);
            }
            else{
             
              arr1=rowCells[5];
              //console.log(rowCells[0]+" " +arr1);
            }
            var flag=0;
            for(var i=0;i<arr1.length;i++){
              if(countrycode == arr1[i]){
                
                  flag=1;
              }
            }
            
            //var arr1=rowCells[5].split('|');
            //console.log(arr1.length);
            if(flag == 1){

              //table += '<td>';
              if(rowCells[5].includes('|')){
                count++;
                rowCells[rowCell]=rowCells[rowCell].split('|').join(',');
              }
              //table += rowCells[rowCell];
              //table += '</td>';
              
            }
            
          }
        }
        if (singleRow === 0) {
         // table += '</tr>';
         
         // table += '</thead>';
         // table += '<tbody>';
        } else {

          //table += '</tr>';
        }
      }
  
      //console.log(selectHTML);
      document.getElementById('s1').innerHTML=selectHTML;

     // table += '</tbody>';
     // table += '</table>';
      
      /*if(count > 0){
        document.getElementById('count').innerHTML=" Records Found";
      }else{
        document.getElementById('count').innerHTML=" Records not Found";
      }
   
      document.getElementById('div1').innerHTML=table;*/

    }
  }
  xmlhttp.open("GET","http://192.168.200.53/demo1/locations.csv",true);
  xmlhttp.send();

  }

  function LtoRSingle() {
    var move=document.getElementById("s2").innerHTML;
    var x=document.getElementById("s1");
    var sel=x.selectedIndex;
    if (sel == -1) {
        window.alert("You must first select an item on the left side.")
    } else {
      for (var i = 0; i < x.options.length; i++) {

         if(x.options[i].selected ==true){
             move =move + "<option value='" + x.options[i].value + "'>" + x.options[i].text + "</option>";
              //console.log(x.options[i].text);
              x.remove(i);
              i--;
          }
      }

      document.getElementById('s2').innerHTML=move;
    }
  }
  function LtoRDouble() {
    var moveall=document.getElementById("s2").innerHTML;
    var x=document.getElementById("s1");
      for (var i = 0; i < x.options.length; i++) {
             moveall =moveall + "<option value='" + x.options[i].value + "'>" + x.options[i].text + "</option>";
              //console.log(x.options[i].text);
      }

      document.getElementById('s2').innerHTML=moveall;
      document.getElementById('s1').innerHTML="";
  }
  function RtoLSingle() {
    var move=document.getElementById("s1").innerHTML;
    var x=document.getElementById("s2");
    var sel=x.selectedIndex;
    if (sel == -1) {
        window.alert("You must first select an item on the right side.")
    } else {
      for (var i = 0; i < x.options.length; i++) {

         if(x.options[i].selected ==true){
             move =move + "<option value='" + x.options[i].value + "'>" + x.options[i].text + "</option>";
              console.log(x.options[i].text);
              x.remove(i);
              i--;
          }
      }

      document.getElementById('s1').innerHTML=move;
    }
  }
  function RtoLDouble() {
    var moveall=document.getElementById("s1").innerHTML;
    var x=document.getElementById("s2");
      for (var i = 0; i < x.options.length; i++) {
             moveall =moveall + "<option value='" + x.options[i].value + "'>" + x.options[i].text + "</option>";
              console.log(x.options[i].text);
      }

      document.getElementById('s1').innerHTML=moveall;
      document.getElementById('s2').innerHTML="";
  }
  function up() {
     var select = document.getElementById("s2");
    var options = select && select.options;
    var selected = [];

    for (var i = 0, iLen = options.length; i < iLen; i++) {
        if (options[i].selected) {
            selected.push(options[i]);
        }
    }

    for (i = 0, iLen = selected.length; i < iLen; i++) {
        var index = selected[i].index;

        if(index == 0){
          window.alert("This is First Index...Please select another to move up!");
            break;
        }

        var temp = selected[i].text;
        selected[i].text = options[index - 1].text;
        options[index - 1].text = temp;

        temp = selected[i].value;
        selected[i].value = options[index - 1].value;
        options[index - 1].value = temp;

        selected[i].selected = false;
        options[index - 1].selected = true;
    }
  }
  function down() {
   var select = document.getElementById("s2");
    var options = select && select.options;
    var selected = [];

    for (var i = 0, iLen = options.length; i < iLen; i++) {
        if (options[i].selected) {
            selected.push(options[i]);
        }
    }

    for (i = selected.length - 1, iLen = 0; i >= iLen; i--) {
        var index = selected[i].index;

        if(index == (options.length - 1)){
          window.alert("This is Last Index...Please select another to move down!");
            break;
        }

        var temp = selected[i].text;
        selected[i].text = options[index + 1].text;
        options[index + 1].text = temp;

        temp = selected[i].value;
        selected[i].value = options[index + 1].value;
        options[index + 1].value = temp;

        selected[i].selected = false;
        options[index + 1].selected = true;
    }
  }

function getData() {
  //console.log("getdata called");
  var x=document.getElementById('s2');
    var l=[];
    for (var i = 0; i < x.options.length; i++) {
             l[i] =x.options[i].value;
             //console.log(l[i]);
     
      }
    if (window.XMLHttpRequest) {
    // code for IE7+, Firefox, Chrome, Opera, Safari
    xmlhttp=new XMLHttpRequest();
  } else { // code for IE6, IE5
    xmlhttp=new ActiveXObject("Microsoft.XMLHTTP");
  }
  xmlhttp.onreadystatechange=function() {
   // var selectHTML = "";
    var count=0;
    if (this.readyState==4 && this.status==200) {
      data=this.responseText;  
      var allRows = data.split(/\r?\n|\r/);
      //alert(allRows);
      var table = '<table border="1">';
      for (var singleRow = 0; singleRow < allRows.length; singleRow++) {
        if (singleRow === 0) {
          //table += '<thead>';
          table += '<tr>';
        } 
        
        var rowCells = allRows[singleRow].split(',');
        
         //console.log(l.length);
        
        for (var rowCell = 0; rowCell < l.length; rowCell++) {
          var ind=l[rowCell];
          if (singleRow === 0) {
           // console.log(rowCells[rowCell]);
            //alert(rowCell);
            //selectHTML =selectHTML + "<option value='" + rowCell + "'>" + rowCells[rowCell] + "</option>";
            table += '<th>';
            table += rowCells[ind];
            
            table += '</th>';
          } else {
            var arr1;
            if(rowCells[5].includes('|')){
             
              arr1=rowCells[5].split('|');
              //console.log(rowCells[0]+" " +arr1);
            }
            else{
             
              arr1=rowCells[5];
              //console.log(rowCells[0]+" " +arr1);
            }
            var flag=0;
            for(var i=0;i<arr1.length;i++){
              if(countrycode == arr1[i]){
                  flag=1;
              }
            }
            
            //var arr1=rowCells[5].split('|');
            //console.log(arr1.length);
            if(flag == 1){

              table += '<td>';
              if(rowCells[5].includes('|')){
                count++;
                rowCells[ind]=rowCells[ind].split('|').join(',');
              }
              table += rowCells[ind];
              console.log(rowCells[ind]);
              table += '</td>';
              
            }
            
          }
        }
        if (singleRow === 0) {
          table += '</tr>';
         
         // table += '</thead>';
         // table += '<tbody>';
        } else {

          table += '</tr>';
        }
      }
  
      //console.log(selectHTML);
     // document.getElementById('s1').innerHTML=selectHTML;

     // table += '</tbody>';
      table += '</table>';
      
      if(count > 0){
        document.getElementById('count').innerHTML=" Records Found";
      }else{
        document.getElementById('count').innerHTML=" Records not Found";
      }
   
      document.getElementById('div1').innerHTML=table;

    }
  }
  xmlhttp.open("GET","http://192.168.200.53/demo1/locations.csv",true);
  xmlhttp.send();
}