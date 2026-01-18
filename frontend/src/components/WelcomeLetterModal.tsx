'use client';

import { useState, useEffect } from 'react';

export default function WelcomeLetterModal() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    // Check if the letter has been shown before
    const hasSeenLetter = localStorage.getItem('tacos-welcome-letter-seen');
    if (!hasSeenLetter) {
      setIsOpen(true);
    }
  }, []);

  const handleClose = () => {
    localStorage.setItem('tacos-welcome-letter-seen', 'true');
    setIsOpen(false);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-gradient-to-r from-red-600 to-orange-500 text-white p-6 rounded-t-2xl">
          <div className="flex items-center gap-3">
            <span className="text-4xl">🌮</span>
            <div>
              <h2 className="text-2xl font-bold">Bienvenidos!</h2>
              <p className="text-white/90">A Message for Tacos Los Huevones</p>
            </div>
          </div>
        </div>

        {/* Letter Content */}
        <div className="p-6 space-y-4 text-gray-700 leading-relaxed">
          <p className="font-semibold text-gray-900">
            Estimado Alejandro y Familia de Tacos Los Huevones:
          </p>

          <p>
            Mi nombre es Adam y soy cliente leal de Tacos Los Huevones desde hace mucho tiempo.
            Como propietario de <strong>EPIC AI</strong>, una empresa que crea sitios web y apoya
            las necesidades comerciales, he tenido el placer de construir un sitio web personalizado
            para su negocio, <strong>completamente gratis</strong>.
          </p>

          <p>
            He creado este sitio web porque creo firmemente en su restaurante y quiero ayudarle a crecer.
            El objetivo principal es aumentar sus ventas a través de la conveniencia de pedidos en línea,
            permitiendo que sus clientes ordenen desde la comodidad de sus hogares o trabajos. Si lo desea,
            el sitio también puede utilizarse para pedidos de entrega a domicilio.
          </p>

          <div className="bg-green-50 border border-green-200 rounded-xl p-4 my-4">
            <h3 className="font-bold text-green-800 mb-2">💰 Lo que ofrezco - Sin Costo Para Usted:</h3>
            <p className="text-green-700">
              El sitio web está completamente construido y listo para usar. Para los pedidos en línea,
              los clientes pagarán una tarifa de <strong>$1.50 por pedido</strong> - esto significa que
              usted no paga nada. El cliente cubre esta pequeña tarifa de conveniencia por el servicio
              de pedidos en línea.
            </p>
          </div>

          <p className="font-semibold text-gray-900">Si decide proceder, yo me encargaré de:</p>

          <ul className="space-y-2 ml-4">
            <li className="flex items-start gap-2">
              <span className="text-green-600 font-bold">✓</span>
              Pulir el sitio web para reflejar exactamente su menú actual
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 font-bold">✓</span>
              Conectar el sistema de pedidos en línea directamente con su cuenta de Square
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 font-bold">✓</span>
              Configurar un sistema de notificaciones para que reciba alertas instantáneas de cada pedido
            </li>
            <li className="flex items-start gap-2">
              <span className="text-green-600 font-bold">✓</span>
              Vincular el sitio web con su página de Google My Business para mayor visibilidad
            </li>
          </ul>

          <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 my-4">
            <h3 className="font-bold text-amber-800 mb-3">🚀 Beneficios para su negocio:</h3>
            <ul className="space-y-2 text-amber-900">
              <li><strong>Más Ventas:</strong> Los clientes pueden ordenar 24/7, incluso cuando están ocupados para llamar</li>
              <li><strong>Mayor Visibilidad:</strong> Aparecer en Google con un sitio web profesional atrae más clientes</li>
              <li><strong>Conveniencia:</strong> Los pedidos van directamente a su sistema Square - sin trabajo extra</li>
              <li><strong>Competitivo:</strong> Muchos restaurantes ahora ofrecen pedidos en línea - no se quede atrás</li>
              <li><strong>Oportunidades de Catering:</strong> El sitio web también puede ayudar a mostrar y vender servicios de catering para eventos locales y fiestas</li>
              <li><strong>Sin Costo Para Usted:</strong> Los clientes pagan la pequeña tarifa de servicio, no usted</li>
            </ul>
          </div>

          <p>
            Como cliente que ama su comida, quiero ver a Tacos Los Huevones prosperar y alcanzar
            aún más personas en Parker y sus alrededores. Este sitio web es mi forma de apoyar
            un negocio local que aprecio.
          </p>

          <p>
            Avíseme si tiene alguna pregunta. Estaré feliz de reunirme en persona en el parque
            para finalizar la configuración.
          </p>

          <div className="border-t pt-4 mt-6">
            <p className="font-semibold">Atentamente,</p>
            <p className="text-xl font-bold text-gray-900">Adam</p>
            <p className="text-red-600 font-semibold">EPIC AI</p>
            <p className="text-gray-600">📞 (303) 434-4633</p>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-gray-50 p-4 border-t rounded-b-2xl">
          <button
            onClick={handleClose}
            className="w-full bg-gradient-to-r from-red-600 to-orange-500 text-white py-3 px-6 rounded-xl font-bold text-lg hover:from-red-700 hover:to-orange-600 transition-all shadow-lg hover:shadow-xl"
          >
            ¡Entendido! Ver el Sitio Web →
          </button>
        </div>
      </div>
    </div>
  );
}
