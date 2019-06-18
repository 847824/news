(function(){
          var html=document.querySelector('html') 
          html.style.fontSize=window.innerWidth/7.5+'px'
          window.onresize=function(e){
            html.style.fontSize=window.innerWidth/7.5+'px'
          }
            })() 