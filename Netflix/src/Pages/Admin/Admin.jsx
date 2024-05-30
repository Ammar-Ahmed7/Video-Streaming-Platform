import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

const AdminPage = () => {
  const { register, handleSubmit, reset } = useForm();
  const [media, setMedia] = useState([]);
  const [selectedMedia, setSelectedMedia] = useState(null);
  const [mediaType, setMediaType] = useState('movies');

  useEffect(() => {
    fetchMedia();
  }, [mediaType]);

  const fetchMedia = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/${mediaType}`);
      setMedia(response.data);
    } catch (error) {
      console.error(`Error fetching ${mediaType}:`, error);
    }
  };

const onSubmitAdd = async (data) => {
  const formData = new FormData();
  formData.append('title', data.title);
  formData.append('description', data.description);
  formData.append('duration', data.duration);
  formData.append('age', data.age);
  formData.append('release', data.release);
  formData.append('genre', data.genre);
  formData.append('videoFile', data.videoFile[0]);
  formData.append('trailerFile', data.trailerFile[0]);
  formData.append('imageFile', data.imageFile[0]);

  try {
    const response = await axios.post(`http://localhost:3000/api/${mediaType}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    });
    console.log(`${mediaType} added:`, response.data);
    reset();
    fetchMedia(); // This should fetch the correct media based on the updated mediaType
  } catch (error) {
    console.error(`Error adding ${mediaType}:`, error);
  }
};


  const handleMediaTypeChange = (e) => {
    setMediaType(e.target.value);
  };
  console.log(mediaType)

  const onSubmitDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:3000/api/${mediaType}/${id}`);
      console.log(`${mediaType} deleted`);
      fetchMedia();
    } catch (error) {
      console.error(`Error deleting ${mediaType}:`, error);
    }
  };

  const onSubmitUpdate = async (data) => {
    const formData = new FormData();
    for (const key in data) {
      formData.append(key, data[key]);
    }

    try {
      const response = await axios.put(
        `http://localhost:3000/api/${mediaType}/${selectedMedia._id}`,
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      );
      console.log(`${mediaType} updated:`, response.data);
      reset();
      setSelectedMedia(response.data);
      fetchMedia();
    } catch (error) {
      console.error(`Error updating ${mediaType}:`, error);
    }
  };

  const selectMedia = (media) => {
    setSelectedMedia(media);
    reset({
      title: media.title,
      description: media.description,
      duration: media.duration,
      age: media.age,
      release: media.release,
      genre: media.genre
    });
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl mb-4">Admin Panel</h1>

      {/* Select Media Type */}
      <div>
        <label>
          <input
            type="radio"
            value="movies"
            checked={mediaType === 'movies'}
            onChange={handleMediaTypeChange}
          />
          Movie
        </label>
        <label>
          <input
            type="radio"
            value="tv"
            checked={mediaType === 'tv'}
            onChange={handleMediaTypeChange}
          />
          TV Series
        </label>
      </div>

      {/* Add New Media */}
      <h2 className="text-xl mb-4">Add New {mediaType === 'movies' ? 'Movie' : 'TV Show'}</h2>
      <form onSubmit={handleSubmit(onSubmitAdd)} className="space-y-4">
        {/* Form fields for adding new media */}
        <div>
          <label className="block text-sm font-medium">Title</label>
          <input
            type="text"
            {...register('title', { required: true })}
            className="mt-1 block w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Description</label>
          <textarea
            {...register('description', { required: true })}
            className="mt-1 block w-full"
          ></textarea>
        </div>
        <div>
          <label className="block text-sm font-medium">Duration</label>
          <input
            type="text"
            {...register('duration', { required: true })}
            className="mt-1 block w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Age</label>
          <input
            type="text"
            {...register('age', { required: true })}
            className="mt-1 block w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Release</label>
          <input
            type="text"
            {...register('release', { required: true })}
            className="mt-1 block w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Genre</label>
          <input
            type="text"
            {...register('genre', { required: true })}
            className="mt-1 block w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Video File</label>
          <input
            type="file"
            {...register('videoFile', { required: true })}
            className="mt-1 block w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Trailer File</label>
          <input
            type="file"
            {...register('trailerFile', { required: true })}
            className="mt-1 block w-full"
          />
        </div>
        <div>
          <label className="block text-sm font-medium">Image File</label>
          <input
            type="file"
            {...register('imageFile', { required: true })}
            className="mt-1 block w-full"
          />
        </div>
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 mt-4">
          Upload
        </button>
      </form>

      {/* Delete Media */}
      <h2 className="text-xl mt-8 mb-4">Delete {mediaType === 'movies' ? 'Movie' : 'TV Show'}</h2>
      <div className="space-y-4">
        {media.map((mediaItem) => (
          <div key={mediaItem._id} className="border p-2">
            <p>{mediaItem.title}</p>
            <button onClick={() => onSubmitDelete(mediaItem._id)} className="bg-red-500 text-white px-4 py-2 mt-2">
              Delete
            </button>
          </div>
        ))}
      </div>

      {/* Update Media */}
     {/* Update Media */}
<h2 className="text-xl mt-8 mb-4">Update {mediaType === 'movies' ? 'Movie' : 'TV Show'}</h2>
{selectedMedia && (
  <form onSubmit={handleSubmit(onSubmitUpdate)} className="space-y-4">
    {/* Form fields for updating media */}
    <div>
      <label className="block text-sm font-medium">Title</label>
      <input
        type="text"
        {...register('title')}
        defaultValue={selectedMedia.title}
        className="mt-1 block w-full"
      />
    </div>
    <div>
      <label className="block text-sm font-medium">Description</label>
      <textarea
        {...register('description')}
        defaultValue={selectedMedia.description}
        className="mt-1 block w-full"
      ></textarea>
    </div>
    <div>
      <label className="block text-sm font-medium">Duration</label>
      <input
        type="text"
        {...register('duration')}
        defaultValue={selectedMedia.duration}
        className="mt-1 block w-full"
      />
    </div>
    <div>
      <label className="block text-sm font-medium">Age</label>
      <input
        type="text"
        {...register('age')}
        defaultValue={selectedMedia.age}
        className="mt-1 block w-full"
      />
    </div>
    <div>
      <label className="block text-sm font-medium">Release</label>
      <input
        type="text"
        {...register('release')}
        defaultValue={selectedMedia.release}
        className="mt-1 block w-full"
      />
    </div>
    <div>
      <label className="block text-sm font-medium">Genre</label>
      <input
        type="text"
        {...register('genre')}
        defaultValue={selectedMedia.genre}
        className="mt-1 block w-full"
      />
    </div>
    <div>
      <label className="block text-sm font-medium">Video File</label>
      <input
        type="file"
        {...register('videoFile')}
        className="mt-1 block w-full"
      />
    </div>
    <div>
      <label className="block text-sm font-medium">Trailer File</label>
      <input
        type="file"
        {...register('trailerFile')}
        className="mt-1 block w-full"
      />
    </div>
    <div>
      <label className="block text-sm font-medium">Image File</label>
      <input
        type="file"
        {...register('imageFile')}
        className="mt-1 block w-full"
      />
    </div>
    <button type="submit" className="bg-blue-500 text-white px-4 py-2 mt-4">
      Update
    </button>
  </form>
)}


      {/* Display Media */}
      <h2 className="text-xl mt-8 mb-4">{mediaType === 'movies' ? 'Movies' : 'TV Shows'} List</h2>
      <div>
        {media.map((mediaItem) => (
          <div key={mediaItem._id} className="border p-2 mt-4" onClick={() => selectMedia(mediaItem)}>
            <p>Title: {mediaItem.title}</p>
            <p>Description: {mediaItem.description}</p>
            <p>Duration: {mediaItem.duration}</p>
            <p>Age: {mediaItem.age}</p>
            <p>Release: {mediaItem.release}</p>
            <p>Genre: {mediaItem.genre}</p>
            <p>Video: {mediaItem.videoUrl}</p>
            <p>Trailer: {mediaItem.trailerUrl}</p>
            <p>Image: {mediaItem.imageUrl}</p>
            {/* Display video trailer and image */}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminPage;
