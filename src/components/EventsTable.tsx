import { format, parseISO } from 'date-fns';
import { CalendarEvent } from '../types';
import { MapPin, Clock } from 'lucide-react';

interface EventsTableProps {
  events: CalendarEvent[];
  dateFilter: string;
}

export default function EventsTable({ events, dateFilter }: EventsTableProps) {
  const filteredEvents = dateFilter
    ? events.filter(
        (event) =>
          format(parseISO(event.start.dateTime), 'yyyy-MM-dd') === dateFilter
      )
    : events;

  return (
    <div className="overflow-x-auto bg-white rounded-lg shadow">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="bg-gray-50">
          <tr>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Event Name
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Date
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Time
            </th>
            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
              Location
            </th>
          </tr>
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {filteredEvents.map((event) => (
            <tr key={event.id} className="hover:bg-gray-50">
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm font-medium text-gray-900">
                  {event.summary}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="text-sm text-gray-900">
                  {format(parseISO(event.start.dateTime), 'MMM dd, yyyy')}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center text-sm text-gray-900">
                  <Clock className="w-4 h-4 mr-1 text-gray-400" />
                  {format(parseISO(event.start.dateTime), 'h:mm a')}
                </div>
              </td>
              <td className="px-6 py-4 whitespace-nowrap">
                <div className="flex items-center text-sm text-gray-900">
                  <MapPin className="w-4 h-4 mr-1 text-gray-400" />
                  {event.location || 'No location'}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}