const Dashboard = () => {
  return (
    <div className="p-4 space-y-4" style={{ minHeight: "200vh" }}>
      {/* Contenido normal que puede crecer */}
      <div className="grid gap-4 md:grid-cols-3">
        <div className="bg-muted/50 aspect-video rounded-xl" />
        <div className="bg-muted/50 aspect-video rounded-xl" />
        <div className="bg-muted/50 aspect-video rounded-xl" />
      </div>

      {/* Más contenido */}
      <div className="grid gap-4 md:grid-cols-2">
        <div className="bg-amber-300 w-full h-[390px]"></div>
        <div className="bg-amber-300 w-full h-[390px]"></div>
        <div className="bg-amber-300 w-full h-[390px]"></div>
        <div className="bg-amber-300 w-full h-[390px]"></div>
      </div>

      <p className="text-red-500">Si ves esto con scroll, el layout funciona</p>
    </div>
  );
};

export default Dashboard;
