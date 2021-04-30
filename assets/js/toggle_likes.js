
// implementing toggle_like via class 
class ToggleLike{
    constructor(toggleElement)
    {
        this.toggler = toggleElement;
        this.toggleLike();
    }
    toggleLike(){
        $(this.toggler).click(function(event){
            event.preventDefault();
            let self = this;
            // this is new way of writing AJAX call (like promise)
            $.ajax({
                type : 'POST',
                url : $(self).attr('href')
            })
            .done(function(data){
                let likesCount = parseInt($(self).attr('data-likes'));
                console.log(likesCount);
                if(data.data.deleted)
                {
                    likesCount-=1;
                }
                else
                {
                    likesCount+=1;

                }
                $(self).attr('data-likes',likesCount);
                $(self).html(`${likesCount} likes`);

            })
            .fail(function(err)
            {
                 console.log("error in accessing like request",err);
            });

        });
    }
}