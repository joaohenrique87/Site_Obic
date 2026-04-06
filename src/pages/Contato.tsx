import { useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Mail, MapPin, Phone, Send, CheckCircle } from "lucide-react";
import emailjs from "@emailjs/browser";


const EMAILJS_SERVICE_ID = "service_jozgifm";
const EMAILJS_TEMPLATE_ID = "template_opcnmyi";
const EMAILJS_PUBLIC_KEY = "cv3IgmGvPiR2RduBV";

const Contato = () => {
  const [form, setForm] = useState({ nome: "", email: "", telefone: "", mensagem: "" });
  const [loading, setLoading] = useState(false);
  const [sucesso, setSucesso] = useState(false);
  const [erro, setErro] = useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setErro("");

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          nome: form.nome,
          email: form.email,
          telefone: form.telefone,
          mensagem: form.mensagem,
        },
        EMAILJS_PUBLIC_KEY
      );
      setSucesso(true);
      setForm({ nome: "", email: "", telefone: "", mensagem: "" });
    } catch (err) {
      setErro("Ocorreu um erro ao enviar a mensagem. Tente novamente.");
    } finally {
      setLoading(false);
    }
  };

  const inputStyle = {
    width: '100%',
    padding: '0.75rem 1rem',
    borderRadius: '10px',
    border: '1.5px solid hsl(var(--border))',
    background: 'hsl(var(--background))',
    color: 'hsl(var(--foreground))',
    fontSize: '0.95rem',
    outline: 'none',
    transition: 'border-color 0.2s',
    fontFamily: 'Cambria, serif',
  };

  const labelStyle = {
    display: 'block',
    fontSize: '0.85rem',
    fontWeight: 600,
    marginBottom: '0.4rem',
    color: 'hsl(var(--foreground))',
    fontFamily: 'Cambria, serif',
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1">

        {/* Hero */}
        <section className="bg-gradient-primary py-20">
          <div className="container">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-primary-foreground mb-6">
                Fale Conosco
              </h1>
              <p className="text-lg text-primary-foreground/90">
                Entre em contato com o Observatório de Indicadores Culturais e Inovação em Dados
              </p>
            </div>
          </div>
        </section>

        {/* Conteúdo */}
        <section className="py-20 bg-background">
          <div className="container">
            <div style={{
              display: 'grid',
              gridTemplateColumns: '1fr 2fr',
              gap: '4rem',
              alignItems: 'start',
              maxWidth: '1100px',
              margin: '0 auto',
            }}>

              {/* Informações de contato */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '2rem' }}>
                <div>
                  <h2 style={{ fontFamily: 'Cambria, serif', fontSize: '1.5rem', fontWeight: 700, marginBottom: '1rem' }}>
                    Informações
                  </h2>
                  <p style={{ fontFamily: 'Cambria, serif', fontSize: '0.95rem', color: 'hsl(var(--muted-foreground))', lineHeight: 1.7 }}>
                    Estamos disponíveis para responder dúvidas, receber sugestões e colaborar com pesquisas sobre políticas culturais.
                  </p>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                    <div style={{ padding: '0.6rem', borderRadius: '8px', background: 'hsl(var(--primary)/0.1)', flexShrink: 0 }}>
                      <MapPin style={{ width: '18px', height: '18px', color: 'hsl(var(--primary))' }} />
                    </div>
                    <div>
                      <p style={{ fontWeight: 600, fontSize: '0.85rem', marginBottom: '0.2rem', fontFamily: 'Cambria, serif' }}>Endereço</p>
                      <a
                        href="https://www.google.com/maps/search/?api=1&query=R.+José+de+Alencar,+388+Boa+Vista+Recife+PE"
                        target="_blank"
                        rel="noreferrer"
                        style={{ fontSize: '0.85rem', color: 'hsl(var(--muted-foreground))', textDecoration: 'none', fontFamily: 'Cambria, serif' }}
                      >
                        R. José de Alencar, 388 - Boa Vista<br />Recife - PE, 50070-030
                      </a>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                    <div style={{ padding: '0.6rem', borderRadius: '8px', background: 'hsl(var(--primary)/0.1)', flexShrink: 0 }}>
                      <Mail style={{ width: '18px', height: '18px', color: 'hsl(var(--primary))' }} />
                    </div>
                    <div>
                      <p style={{ fontWeight: 600, fontSize: '0.85rem', marginBottom: '0.2rem', fontFamily: 'Cambria, serif' }}>E-mail</p>
                      <a
                        href="mailto:contato@observatorio@secult.pe.gov.br"
                        style={{ fontSize: '0.85rem', color: 'hsl(var(--muted-foreground))', textDecoration: 'none', fontFamily: 'Cambria, serif' }}
                      >
                        observatorio@secult.pe.gov.br
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              {/* Formulário */}
              <div style={{
                background: 'hsl(var(--card))',
                borderRadius: '16px',
                padding: '2.5rem',
                border: '1px solid hsl(var(--border))',
                boxShadow: '0 4px 24px rgba(0,0,0,0.06)',
              }}>
                {sucesso ? (
                  <div style={{ textAlign: 'center', padding: '2rem 0' }}>
                    <CheckCircle style={{ width: '56px', height: '56px', color: '#16a34a', margin: '0 auto 1rem' }} />
                    <h3 style={{ fontFamily: 'Cambria, serif', fontSize: '1.3rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                      Mensagem enviada!
                    </h3>
                    <p style={{ fontFamily: 'Cambria, serif', color: 'hsl(var(--muted-foreground))', fontSize: '0.95rem' }}>
                      Obrigado pelo contato. Retornaremos em breve.
                    </p>
                    <button
                      onClick={() => setSucesso(false)}
                      style={{
                        marginTop: '1.5rem', padding: '0.6rem 1.5rem', borderRadius: '8px',
                        background: 'hsl(var(--primary))', color: 'hsl(var(--primary-foreground))',
                        border: 'none', cursor: 'pointer', fontWeight: 600, fontFamily: 'Cambria, serif',
                      }}
                    >
                      Enviar outra mensagem
                    </button>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
                    <h2 style={{ fontFamily: 'Cambria, serif', fontSize: '1.4rem', fontWeight: 700, marginBottom: '0.5rem' }}>
                      Envie uma mensagem
                    </h2>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
                      <div>
                        <label style={labelStyle}>Nome *</label>
                        <input
                          type="text"
                          name="nome"
                          value={form.nome}
                          onChange={handleChange}
                          required
                          placeholder="Seu nome completo"
                          style={inputStyle}
                          onFocus={e => (e.target.style.borderColor = 'hsl(var(--primary))')}
                          onBlur={e => (e.target.style.borderColor = 'hsl(var(--border))')}
                        />
                      </div>
                      <div>
                        <label style={labelStyle}>E-mail *</label>
                        <input
                          type="email"
                          name="email"
                          value={form.email}
                          onChange={handleChange}
                          required
                          placeholder="seu@email.com"
                          style={inputStyle}
                          onFocus={e => (e.target.style.borderColor = 'hsl(var(--primary))')}
                          onBlur={e => (e.target.style.borderColor = 'hsl(var(--border))')}
                        />
                      </div>
                    </div>

                    <div>
                      <label style={labelStyle}>Telefone</label>
                      <input
                        type="tel"
                        name="telefone"
                        value={form.telefone}
                        onChange={handleChange}
                        placeholder="(DDD) 99999-9999"
                        style={inputStyle}
                        onFocus={e => (e.target.style.borderColor = 'hsl(var(--primary))')}
                        onBlur={e => (e.target.style.borderColor = 'hsl(var(--border))')}
                      />
                    </div>

                    <div>
                      <label style={labelStyle}>Mensagem *</label>
                      <textarea
                        name="mensagem"
                        value={form.mensagem}
                        onChange={handleChange}
                        required
                        placeholder="Escreva sua mensagem..."
                        rows={5}
                        style={{ ...inputStyle, resize: 'vertical' }}
                        onFocus={e => (e.target.style.borderColor = 'hsl(var(--primary))')}
                        onBlur={e => (e.target.style.borderColor = 'hsl(var(--border))')}
                      />
                    </div>

                    {erro && (
                      <p style={{ color: '#c0392b', fontSize: '0.85rem', fontFamily: 'Cambria, serif' }}>{erro}</p>
                    )}

                    <button
                      type="submit"
                      disabled={loading}
                      style={{
                        display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem',
                        padding: '0.75rem 2rem', borderRadius: '10px', border: 'none',
                        background: loading ? 'hsl(var(--muted))' : 'hsl(var(--primary))',
                        color: loading ? 'hsl(var(--muted-foreground))' : 'hsl(var(--primary-foreground))',
                        fontWeight: 700, fontSize: '0.95rem', cursor: loading ? 'not-allowed' : 'pointer',
                        fontFamily: 'Cambria, serif', transition: 'opacity 0.2s',
                        alignSelf: 'flex-end',
                      }}
                    >
                      {loading ? 'Enviando...' : (
                        <>
                          <Send style={{ width: '16px', height: '16px' }} />
                          Enviar mensagem
                        </>
                      )}
                    </button>
                    <a
                      href="https://wa.me/5581984942007?text=Olá vim do Site do Observatório de Indicadores Culturais"
                      target="_blank"
                      className="bg-green-500 text-white px-10 py-3 rounded-lg inline-block mt-4"
                    >

                      WhatsApp

                    </a>
                  </form>
                )}


              </div>

            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Contato;