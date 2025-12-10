export default function TermsAndConditions() {
  return (
    <div className="min-h-screen bg-base-200 py-10 px-4 sm:px-8">
      <div className="max-w-3xl mx-auto bg-base-100 rounded-box shadow-xl p-8">
        <h1 className="text-3xl font-bold mb-6 text-primary">
          Términos y Condiciones
        </h1>

        <div className="prose prose-sm sm:prose-base max-w-none">
          <p className="lead">
            Bienvenido a Estaciona Ya. Al utilizar nuestra plataforma, aceptas
            los términos y condiciones descritos a continuación. Por favor,
            léelos detenidamente antes de proceder con cualquier transacción.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">
            1. Flujo de Pagos y Facturación
          </h3>
          <p>
            Al realizar una reserva a través de nuestra aplicación, aceptas que{' '}
            <strong>
              todo el dinero es recaudado inicialmente por Estaciona Ya
            </strong>
            . Actuamos como intermediarios de confianza para garantizar la
            seguridad de la transacción tanto para el arrendatario como para el
            arrendador.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">
            2. Desembolso a Arrendadores
          </h3>
          <p>
            Nosotros nos encargamos de procesar los pagos y transferir los
            fondos correspondientes a los arrendadores. Estos pagos se realizan
            en fechas de corte específicas (una o más veces al mes), asegurando
            un flujo ordenado y verificado.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">
            3. Comisiones del Servicio
          </h3>
          <p>
            Para mantener y mejorar la plataforma, Estaciona Ya retiene un{' '}
            <strong>pequeño porcentaje</strong> del monto total de la
            transacción en concepto de comisión por servicio y gastos
            administrativos de la pasarela de pagos.
          </p>

          <h3 className="text-xl font-semibold mt-6 mb-3">4. Aceptación</h3>
          <p>
            Continuar con el pago implica que has leído, comprendido y aceptado
            esta modalidad de operación.
          </p>
        </div>

        <div className="mt-8 flex justify-end">
          <a href="/" className="btn btn-primary">
            Volver al Inicio
          </a>
        </div>
      </div>
    </div>
  )
}
