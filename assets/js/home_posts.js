
    // method to submit the form data for new post through AJAX
    let createPost = function(){
        let newPostForm = $('#new-post-form');
        newPostForm.submit(function(event){
            event.preventDefault();
            $.ajax({
                type : 'post',
                url : '/posts/create',
                data : newPostForm.serialize(),
                success : function(data){
                    let newPost = newPostDom(data.data.post);
                    $('#posts-list-container>ul').prepend(newPost);
                    // refer to delete class button which is inside newPost, there is space at starting
                    deletePost($(' .delete-post-button',newPost));
                    // call the create comment class
                    new PostComments(data.data.post._id);

                    new Noty({
                        theme: 'relax',
                        text: "Post published!",
                        type: 'success',
                        layout: 'topRight',
                        timeout: 1500
                        
                    }).show();
                },
                error : function(err){
                    console.log(err.responseText);
                }
                
            });
        });
    }
    // method to create a post in DOM
    let newPostDom = function(post){
        console.log("post : ",post);
        return $(`<li id="post-${post._id}"> 
                    <small>
                        <a class="delete-post-button" href="/posts/delete/?id=${ post._id}">X</a> 
                    </small>
                    <p> ${post.content} </p>
                    <p> ${post.user.name } </p>
                        <!-- form for comments -->
                        <div class="post-comments">
                            <form id="post-${ post._id }-comments-form" action="/comments/create" method="POST">
                                <input type="text" name ="content" placeholder="Add comment ..." required></textarea>
                                <input type="hidden" name="post" value="${ post._id }">
                                <input type="submit" value="Post Comment">
                            </form>

                            <!-- to display comments and author of comments -->
                            <div class="post-comments-list">
                                <ul type="square" id = "post-comments-${ post._id }">
                            
                                </ul>
                            </div>
                        </div>
                  </li>`);
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
                new Noty({
                    theme: 'relax',
                    text: "Post Deleted",
                    type: 'success',
                    layout: 'topRight',
                    timeout: 1500
                    
                }).show();

            },error : function(err){
                console.log(err.responseText);
            }
            });
        });
    }

    // loop over all the existing posts on the page (when the window loads for the first time) and call the delete post method on delete link of each, also add AJAX (using the class we've created) to the delete button of each
    let convertPostsToAjax = function(){
        $('#posts-list-container>ul>li').each(function(){
            let self = $(this);
            let deleteButton = $(' .delete-post-button', self);
            deletePost(deleteButton);

            // get the post's id by splitting the id attribute
            let postId = self.prop('id').split("-")[1]
            new PostComments(postId);
            console.log("line 101 at hone posts");
        });
    }
    createPost();
    convertPostsToAjax();
    
