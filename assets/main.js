//Selectors
let input = document.querySelector('.input-search');
let sectionHeader = document.querySelector('.js_class');
var dataArray = [];
let cards = document.querySelector('.card');
// console.log(dataArray);

//Fetch Data
async function searchData (event) {

    if(event.keyCode === 13 && input.value){
        let fetchAPIResponse = await fetch(`https://api.reddit.com/r/${input.value}`)

        let fetchAPI = await fetchAPIResponse.json()
        dataArray.push(fetchAPI.data.children)
        // console.log(dataArray, "this is data array")
        input.value = '';
        createUI();

    }

}

// Create UI
function createUI () {
    
    return dataArray.forEach(el => {
        // console.log(el, 'hello');
        cards.innerHTML = '';

        el.forEach(element => {

            let div = document.createElement('div');

            sectionHeader.innerHTML = `<div class="container javascript-flex">
                <div class="javascript-header">
                    <h1 class="javascript-text">${element.data.subreddit}</h1>
                    <h2 class="javascript-sub_header">${element.data.subreddit_name_prefixed}</h2>
                </div>
                <div class="javascript-button">
                    <button type="submit" class="javascript-button_join">Join</button>
                </div>
            </div>`

            let newData = `<div class="container js_flex">
                <div class="posts-card flex">
                    <div class="card-vote">
                        <div class="card-vote_content">
                            <button class="vote-button">
                                <i class="fas fa-arrow-up vote-arrow"></i>
                            </button>
                            <p class="content">${element.data.ups}</p>
                            <button class="vote-button">
                                <i class="fas fa-arrow-down vote-arrow"></i>
                            </button>
                        </div>
                    </div>   
                    <div class="flex"> 
                        <div class="post-content">
                            <div class="pinned">
                                <i class="fas fa-thumbtack pinned-icon"></i>
                                <p class="pinned-text">pinned by moderators</p>
                            </div>
                        </div>
                    </div>
                </div>

                 <div class="pinned-heading">
                        <h1>${element.data.title} ${element.data.subreddit_name_prefixed}</h1>
                        <p class='para'>${element.data.selftext}</p>
                    </div>
                <div class="pinned-comment">
                        <i class="fas fa-comment-alt comment-icon"></i>
                        <h3 class="pinned-comment_text">${element.data.num_comments} Comment</h3>
                        <i class="fas fa-share share-icon"></i>
                        <h3 class="pinned-comment_text">Share</h3>
                        <i class="far fa-bookmark save-icon"></i>
                        <h3 class="pinned-comment_text">Save</h3>
                </div>
                </div`
            
                // console.log(newData, 'this is new data');

            cards.append(div);
            div.innerHTML = newData;
            // console.log('Working fine!');
        })
        
    })
}

// Listeners
input.addEventListener('keyup', searchData);