export function MainLayout({ header, cards, activeDay, details }) {
  return (
    <div className="flex flex-col bg-gray-900  min-h-screen min-w-screen select-none">
      {/* Header */}
      <header className="bg-purple-900 p-4 text-left flex">
        <img
          className="h-15"
          src="/images/ticket.png"
          alt="icon image could not be loaded!"
          draggable="false"
        />
        <h1 className="text-2xl font-bold ml-2.5">Tikera</h1>
        {header}
      </header>

      {/* Main Content */}
      <main className="flex p-4">
        <div className="w-43/100 border-r-2 border-black">
          <h1 className="text-left">Movies on {activeDay}</h1>
          {cards}
        </div>
        <div className="w-57/100">
            {details}
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-purple-900 p-4 text-center">
        <p>&copy; 2025 Tikera. All rights reserved.</p>
      </footer>
    </div>
  );
}
