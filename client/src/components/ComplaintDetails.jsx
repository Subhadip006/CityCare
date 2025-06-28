import React from 'react';
import { XCircle, CheckCircle } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Fix for default marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

const ComplaintDetail = ({ complaint, onClose, onSolve }) => {
  if (!complaint) return null;

  const mediaFiles = complaint.Media || [];
  const isSolved = complaint.Status === 'Solved';

  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex justify-center items-center z-50 transition-all duration-300 ease-in-out">
      <div className="bg-white rounded-2xl p-6 max-w-3xl w-full shadow-xl relative border border-gray-200 animate-fadeIn">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-red-500 transition-colors"
        >
          <XCircle className="w-7 h-7" />
        </button>

        <h2 className="text-3xl font-semibold text-gray-900 mb-2">{complaint.Title}</h2>
        <p className="text-gray-700 mb-5 text-base leading-relaxed">{complaint.Description}</p>

        <div className="h-64 mb-6 rounded-xl overflow-hidden border border-gray-300">
          <MapContainer
            center={[complaint.Latitude, complaint.Longitude]}
            zoom={15}
            scrollWheelZoom={false}
            className="h-full w-full"
          >
            <TileLayer
              attribution='&copy; OpenStreetMap contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[complaint.Latitude, complaint.Longitude]}>
              <Popup>{complaint.Title}</Popup>
            </Marker>
          </MapContainer>
        </div>

        {mediaFiles.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {mediaFiles.map((fileUrl, idx) => {
              const isVideo = fileUrl.match(/\.(mp4|webm)$/i);
              return isVideo ? (
                <video
                  key={idx}
                  controls
                  className="w-full h-52 object-cover rounded-xl border border-gray-200"
                >
                  <source src={fileUrl} type="video/mp4" />
                </video>
              ) : (
                <img
                  key={idx}
                  src={fileUrl}
                  alt={`Media ${idx + 1}`}
                  className="w-full h-52 object-cover rounded-xl border border-gray-200"
                />
              );
            })}
          </div>
        )}

        {!isSolved ? (
          <button
            onClick={() => onSolve(complaint.ID)}
            className="flex items-center gap-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition font-medium"
          >
            <CheckCircle className="w-5 h-5" />
            Mark as Solved
          </button>
        ) : (
          <div className="text-green-700 font-semibold flex items-center gap-2">
            <CheckCircle className="w-5 h-5" />
            Complaint Solved
          </div>
        )}
      </div>
    </div>
  );
};

export default ComplaintDetail;
