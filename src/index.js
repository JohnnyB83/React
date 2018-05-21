import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import SearchBar from './components/searchbar';
import VideoList from './components/videolist';
import VideoDetail from './components/videodetail';
import YTSearch from 'youtube-api-search';
import _ from 'lodash';

const API_KEY = 'AIzaSyCj98Ftw3FR5tYYcn1SKuggEEUJ5xwXnTw';

class App extends Component {
    constructor(props) {
        super(props);
        this.state = { 
            videos: [],
            selectedVideo: null
        };

        this.videoSearch('surfboards');
    }

    videoSearch(term) {
        YTSearch({key: API_KEY, term: term}, (videos) => {
            this.setState({
                videos: videos,
                selectedVideo: videos[0]
            });
        });

    }

    render() {
        const videoSearch = _.debounce((term) => {this.videoSearch(term)}, 300);
        return (
            <div>
                <SearchBar onSearchTermChange={videoSearch} />
                <VideoDetail video={this.state.selectedVideo} />
                <VideoList 
                onVideoSelect={selectedVideo => this.setState({selectedVideo})}
                videos={this.state.videos} />
            </div>
        );
    }
}

ReactDOM.render(<App />, document.querySelector('.container'));

