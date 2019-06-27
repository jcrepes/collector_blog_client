var app = new Vue ( {
    el: '#app', 
    data: {
        page: 'blog',
        drawer: false,
        categories: [
            'all',
            'clothing',
            'hunting',
            'books',
            'cards',
            'coins',
            'keychains',
            'comic books',
            'misc'
        ],
        selected_category: 'all',
        posts: [
        ],
        newPost: {
            title: '',
            author: '',
            category: 'all',
            date: new Date(),
            image: '',
            text: ''
        },
    },
    created: function() {
        this.getPosts();
    },
    
    methods: {
        getPosts: function() {
            fetch('http://localhost:3000/posts').then(function(res) {
                res.json().then(function(data) {
                    console.log(data);
                    app.posts = data.posts;
                });
            });
        },
        addPost: function() {
            this.posts.unshift(this.newPost);
            fetch("http://localhost:3000/posts", {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(app.newPost)
            }).then(function() {
                
            });
        },
        
    },
    computed: {
        sorted_posts: function() {
            if (this.selected_category=='all') {
                return this.posts;
            } else {
                var sorted_posts = this.posts.filter(function(post) {
                   return post.category== app.selected_category; 
                });
                return sorted_posts
            }
        }
    },
    
})