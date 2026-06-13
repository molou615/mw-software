import Sidebar from '../components/Sidebar';
import { demoPackages } from '../demoData';

export default function Packages() {
  return (
    <div className="flex min-h-screen bg-gray-100">
      <Sidebar />
      <div className="flex-1 p-8">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-3xl font-bold">Packages</h2>
          <button className="bg-rose-500 text-white px-4 py-2 rounded-lg hover:bg-rose-600">+ Add Package</button>
        </div>
        <div className="grid md:grid-cols-3 gap-6">
          {demoPackages.map((p, i) => (
            <div key={p.id} className={`bg-white rounded-xl shadow-sm overflow-hidden ${i === 2 ? 'ring-2 ring-rose-500' : ''}`}>
              {i === 2 && <div className="bg-rose-500 text-white text-center text-xs font-bold py-1">MOST POPULAR</div>}
              <div className="p-6">
                <h3 className="text-xl font-bold mb-2">{p.name}</h3>
                <p className="text-gray-500 text-sm mb-4">{p.description}</p>
                <div className="text-3xl font-extrabold text-rose-500 mb-4">£{p.price}</div>
                <p className="text-gray-400 text-sm mb-4">{p.duration} minutes</p>
                <ul className="space-y-2 text-sm text-gray-600 mb-6">
                  {p.features.split(',').map((f, i) => (
                    <li key={i} className="flex items-center gap-2"><span className="text-rose-500">✓</span> {f.trim()}</li>
                  ))}
                </ul>
                <div className="flex gap-2">
                  <button className="flex-1 bg-gray-100 text-gray-700 py-2 rounded-lg text-sm hover:bg-gray-200">Edit</button>
                  <button className="flex-1 bg-red-50 text-red-600 py-2 rounded-lg text-sm hover:bg-red-100">Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
