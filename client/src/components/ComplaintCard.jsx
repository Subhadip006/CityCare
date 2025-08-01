import { BadgeCheck, Clock } from 'lucide-react';

const ComplaintCard = ({ complaint, onClick }) => {
  const isResolved = complaint.Status === 'Solved';

  const statusStyles = isResolved
    ? 'bg-green-100 ring-green-200'
    : 'bg-yellow-100 ring-yellow-200';

  const textColor = isResolved ? 'text-green-700' : 'text-yellow-700';

  return (
    <div
      onClick={onClick}
      className="bg-white p-6 rounded-2xl shadow-sm ring-1 ring-gray-200 hover:shadow-lg hover:ring-gray-300 transition-all duration-200 cursor-pointer space-y-3 hover:-translate-y-0.5"
    >
      <div className="flex items-start justify-between">
        <h3 className="text-lg font-semibold text-gray-800 tracking-tight leading-snug flex-1 pr-3">
          {complaint.Title}
        </h3>
        <span
          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-sm font-medium whitespace-nowrap ${statusStyles}`}
        >
          {isResolved ? (
            <BadgeCheck className={`w-4 h-4 ${textColor}`} />
          ) : (
            <Clock className={`w-4 h-4 ${textColor}`} />
          )}
          <span className={`${textColor}`}>{complaint.Status}</span>
        </span>
      </div>

      {complaint.CreatedAt && (
        <p className="text-sm text-gray-500 mt-2">
          Submitted: {new Date(complaint.CreatedAt).toLocaleDateString()}
        </p>
      )}
    </div>
  );
};

export default ComplaintCard;
