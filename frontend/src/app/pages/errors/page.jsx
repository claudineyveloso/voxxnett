
export default function Errors(props) {
  const estiloDoFundo = {
    background: `url(./assets/images/bg-1.png)`,
    // Adicione outras propriedades de estilo conforme necessário
  };

  return (
    <>
      <div class="authentication-bg min-vh-100" style={estiloDoFundo}>
        <div class="bg-overlay bg-light"></div>
        <div class="container">
          <div class="row">
            <div class="col-md-12">
              <div class="text-center py-5">
                <div class="position-relative">
                  <h1 class="error-title error-text mb-0">5<span class="text-primary">0</span>0</h1>
                  <p class="error-subtitle text-uppercase mb-0">Internal Server Error</p>
                </div>
                <p class="font-size-16 mx-auto text-muted w-50">
                  Desculpe, ocorreu um problema interno no servidor. Nossos desenvolvedores foram notificados e estão trabalhando para 
                  corrigir isso o mais rápido possível. Por favor, tente novamente mais tarde.
                </p>
                <div class="mt-4 pt-1 text-center">
                  <a class="btn btn-primary" href="index.html">Voltar para Dashboard</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
  
