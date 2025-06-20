import React, { useEffect, useState } from "react";
import { getBooks } from "../../_sevices/books";


export default function Dashboard() {
  const [bookCount, setBookCount] = useState(0);

  useEffect(() => {
    const fetchBookCount = async () => {
      try {
        const response = getBooks();
        setBookCount(response.data.length);
      } catch (error) {
        console.error("Gagal mengambil jumlah buku:", error);
      }
    };

    fetchBookCount();
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
      <Card
        title="Buku"
        value={bookCount.toString()}
        icon="💼"
      />
      {/* <Card
        title="Pangarang"
        value={data.authors.toString()}
        subtitle="28 Completed"
        icon="📋"
      />
      <Card
        title="Anggota"
        value={data.users.toString()}
        subtitle="1 Completed"
        icon="👥"
      /> */}
    </div>
  );
}

function Card({ title, value, subtitle, icon }) {
  return (
    <div className="bg-gray-100 p-4 rounded-xl relative">
      <div className="absolute top-4 right-4 bg-purple-100 text-purple-600 p-2 rounded-lg text-lg">
        {icon}
      </div>
      <h4 className="text-gray-700 text-sm">{title}</h4>
      <p className="text-2xl font-bold mt-2">{value}</p>
      <p className="text-sm text-gray-500 mt-1">{subtitle}</p>
    </div>
  );
}
