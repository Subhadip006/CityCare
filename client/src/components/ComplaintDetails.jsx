import React from 'react';
import { XCircle, CheckCircle, Loader2 } from 'lucide-react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

const ComplaintDetail = ({ complaint, onClose, onSolve, loading = false }) => {
  if (!complaint) return null;
  
  const mediaFiles = complaint.Media || [];
  const isSolved = complaint.Status === 'Solved';
  
  const handleSolveClick = () => {
    if (loading) return;
    onSolve(complaint.ID);
  };
  
  return (
    <div className="fixed inset-0 bg-black/60 backdrop-blur-md flex justify-center items-center z-50 transition-all duration-300 ease-in-out">
      <div className="bg-white rounded-2xl p-6 max-w-3xl w-full max-h-[90vh] shadow-xl relative border border-gray-200 animate-fadeIn overflow-hidden flex flex-col">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-red-500 transition-colors z-10"
        >
          <XCircle className="w-7 h-7" />
        </button>
        
        <h2 className="text-3xl font-semibold text-gray-900 mb-2 pr-10">{complaint.Title}</h2>
        <p className="text-gray-700 mb-2 text-sm">
          <span className="font-medium">Department:</span> {complaint.Department}
        </p>
        <p className="text-gray-700 mb-5 text-base leading-relaxed">{complaint.Description}</p>
        
        <div className="h-64 mb-6 rounded-xl overflow-hidden border border-gray-300 flex-shrink-0">
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
          <div className="mb-6 flex-1 min-h-0">
            <h3 className="text-lg font-medium text-gray-900 mb-3">Media Files</h3>
            <div className="h-60 overflow-y-auto border border-gray-200 rounded-xl p-3 bg-gray-50">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {mediaFiles.map((media, idx) => {
                  const url = media.ImageURL;
                  return (
                    <img
                      key={idx}
                      src={url}
                      alt={`Media ${idx + 1}`}
                      className="w-full h-52 object-cover rounded-xl border border-gray-200 bg-white"
                    />
                  );
                })}
              </div>
            </div>
          </div>
        )}
        
        <div className="flex-shrink-0">
          {!isSolved ? (
            <button
              onClick={handleSolveClick}
              disabled={loading}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition font-medium ${
                loading
                  ? 'bg-gray-400 text-white cursor-not-allowed'
                  : 'bg-green-600 text-white hover:bg-green-700'
              }`}
            >
              {loading ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  Solving...
                </>
              ) : (
                <>
                  <CheckCircle className="w-5 h-5" />
                  Mark as Solved
                </>
              )}
            </button>
          ) : (
            <div className="text-green-700 font-semibold flex items-center gap-2">
              <CheckCircle className="w-5 h-5" />
              Complaint Solved
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ComplaintDetail;