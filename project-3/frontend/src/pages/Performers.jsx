import Sidebar from '../components/Sidebar';
import { demoPerformers } from '../demoData';

export default function Performers() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Performers</h2>
          <button className="bg-rose-500 text-white px-4 py-2 rounded-lg hover:bg-rose-600">+ Add Performer</button>
        </div>
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {demoPerformers.map((p) => (
            <div key={p.id} className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="bg-gradient-to-r from-rose-500 to-orange-500 p-6 text-white text-center">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center text-3xl mx-auto mb-3">🎭</div>
                <h3 className="font-bold text-lg">{p.user.name}</h3>
              </div>
              <div className="p-4">
                <p className="text-gray-500 text-sm mb-3">{p.bio}</p>
                <div className="flex flex-wrap gap-1">
                  {p.skills.split(',').map((s, i) => (
                    <span key={i} className="bg-rose-50 text-rose-700 text-xs px-2 py-1 rounded-full">{s.trim()}</span>
                  ))}
                </div>
                <div className="mt-4 flex gap-2">
                  <button className="flex-1 bg-gray-100 text-gray-700 py-2 rounded-lg text-sm hover:bg-gray-200">Edit</button>
                  <button className="flex-1 bg-red-50 text-red-600 py-2 rounded-lg text-sm hover:bg-red-100">Remove</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
