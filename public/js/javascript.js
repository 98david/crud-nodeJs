(function readyJS(win, doc){


    if(doc.querySelector('.delete')){
        for(let i = 0 ; i <doc.querySelectorAll('.delete').length;i++){
            doc.querySelectorAll('.delete')[i].addEventListener('click',(event)=> {
                if(confirm("Deseja mesmo apagar este usuário?")){
                        return true;
                    } else {
                        event.preventDefault();
                    }
            } )
        }
    }
})(window,document);