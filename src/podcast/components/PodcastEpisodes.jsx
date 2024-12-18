import React from 'react';
import { useParams } from 'react-router-dom';
import LoadingMessage from './LoadingMessage';
import { Link } from 'react-router-dom';
import './styles.css';
import { usePodcastFetch } from '../../hook/usePodcastFetch ';

const EPISODES_URL = import.meta.env.VITE_PODCAST_EPISODES_URL;

const formatDuration = (milliseconds) => {
    const totalSeconds = Math.floor(milliseconds / 1000);

    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `${hours > 0 ? `${hours}:` : ''}${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
};

export const PodcastEpisodes = () => {
    const { podcastId } = useParams();
    const { episodes, isLoading, hasError, error, episodeCount } = usePodcastFetch(EPISODES_URL, podcastId);

    if (isLoading) {
        return <LoadingMessage />;
    }

    if (hasError) {
        return <div>{error.message}</div>;
    }

    return (
        <div className="podcast-episodes">
            <div className="podcast-card-episodes">
                <h2>Episodes: {episodeCount}</h2>
            </div>
            {!episodes.length ? (
                <p>No hay episodios disponibles</p>
            ) : (
                <div className="podcast-episodes-list">
                    <table className="episodes-table">
                        <thead>
                            <tr>
                                <th>Title</th>
                                <th>Date</th>
                                <th>Duration</th>
                            </tr>
                        </thead>
                        <tbody>
                            {episodes.map((episode) => (
                                <tr key={episode.trackId}>
                                    <td>
                                        <Link
                                            className="custom-nav-bar-brand"
                                            to={`/podcast/${podcastId}/episode/${episode.trackId}`}
                                        >
                                            {episode.trackName}
                                        </Link>
                                    </td>
                                    <td>{new Date(episode.releaseDate).toLocaleDateString()}</td>
                                    <td>{formatDuration(episode.trackTimeMillis)}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            )}
        </div>
    );
};
