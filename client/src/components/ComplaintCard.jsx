import { BadgeCheck, Clock } from 'lucide-react';

const ComplaintCard = ({ complaint, onClick }) => {
  const statusColor = complaint.Status === 'Resolved' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700';

  return (
    <div
      onClick={onClick}
      className="bg-white p-5 rounded-xl border shadow hover:shadow-lg transition-all cursor-pointer"
    >
      <h3 className="text-xl font-semibold text-text mb-2">{complaint.Title}</h3>
      <p className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${statusColor}`}>
        {complaint.Status === 'Resolved' ? <BadgeCheck className="w-4 h-4 mr-1" /> : <Clock className="w-4 h-4 mr-1" />}
        {complaint.Status}
      </p>
    </div>
  );
};

export default ComplaintCard;
