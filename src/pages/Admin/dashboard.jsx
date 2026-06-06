function Dashboard() {
  return (
    <div>

      <h1 className="text-4xl font-bold mb-10">
        Admin Dashboard
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">

        <div className="bg-blue-500 text-white p-6 rounded-xl">
          <h2 className="text-2xl font-bold">
            200
          </h2>

          <p>Total Students</p>
        </div>

        <div className="bg-green-500 text-white p-6 rounded-xl">
          <h2 className="text-2xl font-bold">
            30
          </h2>

          <p>Total Courses</p>
        </div>

        <div className="bg-purple-500 text-white p-6 rounded-xl">
          <h2 className="text-2xl font-bold">
            120
          </h2>

          <p>Total Lectures</p>
        </div>

      </div>

    </div>
  );
}

export default Dashboard;