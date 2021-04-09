{
    // console.log('hello');
    // method to submit the form data for new post through AJAX
    let createPost = function(){
        let newPostForm = $('#new-post-form');
        newPostForm.submit(function(event){
            event.preventDefault();
            $.ajax({
                method : 'post',
                url : '/posts/create',
                data : newPostForm.serialize(),
                success : function(data){
                    let newPost = newPostDom(data.data.post);
                    $('#posts-list-container>ul').prepend(newPost);
                    // refer to delete class button which is inside newPost, there is space at starting
                    deletePost($(' .delete-class-button',newPost));
                },
                error : function(err){
                    console.log(err.responseText);
                }
                
            });
        });
    }
    // method to create a post in DOM
    let newPostDom = function(post){
        return $(`<li id="post-${post._id}"> 
                    <small>
                        <a class="delete-class-button" href="/posts/delete/?id=${ post._id}">X</a> 
                    </small>
                    <p> ${post.content} </p>
                    <p> ${post.user.name } </p>
                        <!-- form for comments -->
                        <div class="post-comments">
                            <form action="/comments/create" method="POST">
                                <input type="text" name ="content" placeholder="Add comment ..." required></textarea>
                                <input type="hidden" name="post" value="${ post._id }">
                                <input type="submit" value="Post Comment">
                            </form>
                        </div>

                    <!-- to display comments and author of comments -->
                    <div class="post-comments-list">
                        <ul type="square" id = "post-comments-<%= post._id %>">
                            
                        </ul>
                    </div>
                  </li>`
                );
    }


    // method to delete the post
    let deletePost = function(deletelink){
        $(deletelink).click(function(event)
        {
            event.preventDefault();
            $.ajax({
            type : 'get',
            url : $(deletelink).prop('href'),
            success : function(data){
                // remove is an ajax inbuilt function
                $(`#post-${data.data.post_id}`).remove();

            },
            error : function(err){
                console.log(err.responseText);
            }

            });
        })
    }
    createPost();
}