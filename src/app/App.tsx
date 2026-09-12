"use client";

import { useState, useEffect } from "react";
import {
  Search, MapPin, Phone, Clock, ExternalLink, Users, BookOpen,
  Mail, Menu, X, CheckCircle, ArrowRight, MessageCircle,
  GraduationCap, HeartHandshake, Stethoscope, Heart,
  Calendar, Info, ChevronRight, Send, Instagram, Facebook,
  Leaf, Building2, Filter
} from "lucide-react";
import logoImage from "@/imports/image.png";
import { ImageWithFallback } from "@/app/components/figma/ImageWithFallback";

// ─── Types ───────────────────────────────────────────────────────────────────

type Service = {
  id: number;
  name: string;
  type: string;
  isFree: boolean;
  costValue?: string;
  audience: string;
  address: string;
  neighborhood: string;
  city: string;
  state: string;
  phone: string;
  isWhatsApp: boolean;
  hours: string;
  howToRequest: string;
  contactLink?: string;
  lastUpdated: string;
};

type Article = {
  id: number;
  title: string;
  author: string;
  credential: string;
  category: string;
  excerpt: string;
  readTime: string;
  imageUrl: string;
};

// ─── Data ─────────────────────────────────────────────────────────────────────

const SERVICES: Service[] = [
  {
    id: 1,
    name: "Clínica-Escola de Nutrição UFRJ",
    type: "Clínica-Escola",
    isFree: true,
    audience: "Comunidade em geral",
    address: "Av. Carlos Chagas Filho, 373",
    neighborhood: "Ilha do Fundão",
    city: "Rio de Janeiro",
    state: "RJ",
    phone: "(21) 3938-6700",
    isWhatsApp: false,
    hours: "Seg a Sex, 8h às 16h",
    howToRequest: "Presencialmente ou por telefone",
    contactLink: "https://nutricao.ufrj.br",
    lastUpdated: "01/08/2024",
  },
  {
    id: 2,
    name: "UBS Jardim das Flores – Serviço de Nutrição",
    type: "Serviço SUS",
    isFree: true,
    audience: "Usuários do SUS cadastrados",
    address: "Rua das Flores, 450",
    neighborhood: "Jardim das Flores",
    city: "São Paulo",
    state: "SP",
    phone: "(11) 4567-8901",
    isWhatsApp: false,
    hours: "Seg a Qui, 7h às 17h",
    howToRequest: "Encaminhamento médico ou diretamente na UBS",
    lastUpdated: "15/07/2024",
  },
  {
    id: 3,
    name: "Projeto NutriComunidade UNICAMP",
    type: "Projeto Universitário",
    isFree: true,
    audience: "Famílias em situação de vulnerabilidade",
    address: "Rua Tessália Vieira de Camargo, 126",
    neighborhood: "Barão Geraldo",
    city: "Campinas",
    state: "SP",
    phone: "(19) 98765-4321",
    isWhatsApp: true,
    hours: "Ter e Qui, 14h às 18h",
    howToRequest: "Via WhatsApp ou e-mail para nutricomun@unicamp.br",
    lastUpdated: "20/08/2024",
  },
  {
    id: 4,
    name: "Consultório Social de Nutrição – ONG VidaSaúde",
    type: "Ação Comunitária",
    isFree: false,
    costValue: "R$ 30,00 / consulta",
    audience: "Adultos e idosos",
    address: "Rua Esperança, 88",
    neighborhood: "Vila Nova",
    city: "Belo Horizonte",
    state: "MG",
    phone: "(31) 99123-4567",
    isWhatsApp: true,
    hours: "Sábados, 8h às 12h",
    howToRequest: "Agendamento via WhatsApp",
    lastUpdated: "10/09/2024",
  },
  {
    id: 5,
    name: "Ambulatório de Nutrição – HC FMUSP",
    type: "Hospital Universitário",
    isFree: true,
    audience: "Pacientes com encaminhamento médico",
    address: "Av. Dr. Enéas de Carvalho Aguiar, 155",
    neighborhood: "Cerqueira César",
    city: "São Paulo",
    state: "SP",
    phone: "(11) 2661-6000",
    isWhatsApp: false,
    hours: "Seg a Sex, 7h às 16h",
    howToRequest: "Encaminhamento médico pelo sistema SUS",
    lastUpdated: "05/08/2024",
  },
  {
    id: 6,
    name: "Núcleo de Nutrição UFMG – Ambulatório Comunitário",
    type: "Clínica-Escola",
    isFree: false,
    costValue: "R$ 20,00 / consulta",
    audience: "Comunidade em geral",
    address: "Av. Antônio Carlos, 6627",
    neighborhood: "Pampulha",
    city: "Belo Horizonte",
    state: "MG",
    phone: "(31) 3409-9826",
    isWhatsApp: false,
    hours: "Seg a Sex, 8h às 17h",
    howToRequest: "Agendamento presencial ou por telefone",
    contactLink: "https://farmacia.ufmg.br",
    lastUpdated: "25/08/2024",
  },
  {
    id: 7,
    name: "Serviço de Nutrição e Dietética – HUUFMA",
    type: "Hospital Universitário",
    isFree: true,
    audience: "Pacientes internados e ambulatorial com encaminhamento",
    address: "Rua Barão de Itapary, 227",
    neighborhood: "Centro",
    city: "São Luís",
    state: "MA",
    phone: "(98) 3272-8100",
    isWhatsApp: false,
    hours: "Seg a Sex, 7h às 13h",
    howToRequest: "Encaminhamento pelo sistema de saúde do Maranhão",
    lastUpdated: "12/08/2024",
  },
  {
    id: 8,
    name: "NutriVida Fortaleza – Extensão UFC",
    type: "Projeto Universitário",
    isFree: true,
    audience: "Moradores de comunidades periféricas",
    address: "Rua Coronel Nunes de Melo, 1127",
    neighborhood: "Rodolfo Teófilo",
    city: "Fortaleza",
    state: "CE",
    phone: "(85) 99876-5432",
    isWhatsApp: true,
    hours: "Quintas, 13h às 17h",
    howToRequest: "Inscrição via WhatsApp com nome e CPF",
    lastUpdated: "03/09/2024",
  },
];

const ARTICLES: Article[] = [
  {
    id: 1,
    title: "5 alimentos que fortalecem sua imunidade",
    author: "Dra. Ana Lima",
    credential: "Nutricionista • CRN-3 12345",
    category: "Imunidade",
    excerpt:
      "Conheça os alimentos mais poderosos para fortalecer suas defesas e como incluí-los no dia a dia com praticidade e baixo custo.",
    readTime: "4 min",
    imageUrl:
      "https://images.unsplash.com/photo-1590779033100-9f60a05a013d?w=600&h=360&fit=crop&auto=format",
  },
  {
    id: 2,
    title: "Como se alimentar bem com pouco dinheiro",
    author: "Dr. Carlos Mendes",
    credential: "Nutricionista • CRN-6 67890",
    category: "Alimentação Acessível",
    excerpt:
      "Dicas práticas e cardápios econômicos que garantem todos os nutrientes sem pesar no bolso da família.",
    readTime: "6 min",
    imageUrl:
      "https://images.unsplash.com/photo-1579113800032-c38bd7635818?w=600&h=360&fit=crop&auto=format",
  },
  {
    id: 3,
    title: "Alimentação saudável na gestação: guia completo",
    author: "Dra. Fernanda Costa",
    credential: "Nutricionista • CRN-8 11223",
    category: "Gestação",
    excerpt:
      "O que comer — e o que evitar — durante a gravidez para garantir a saúde da mãe e o desenvolvimento saudável do bebê.",
    readTime: "8 min",
    imageUrl:
      "https://images.unsplash.com/photo-1610348725531-843dff563e2c?w=600&h=360&fit=crop&auto=format",
  },
  {
    id: 4,
    title: "Segurança alimentar: direito de todos",
    author: "Prof. Dr. João Silva",
    credential: "Pesquisador em Nutrição • UFRJ",
    category: "Política de Saúde",
    excerpt:
      "Entenda o conceito de segurança alimentar, os direitos garantidos pela lei e como a nutrição pode ser uma ferramenta de cidadania.",
    readTime: "5 min",
    imageUrl:
      "https://images.unsplash.com/photo-1490818387583-1baba5e638af?w=600&h=360&fit=crop&auto=format",
  },
];

const TYPE_BADGES: Record<string, string> = {
  "Clínica-Escola": "bg-blue-50 text-blue-700 border-blue-200",
  "Serviço SUS": "bg-emerald-50 text-emerald-700 border-emerald-200",
  "Projeto Universitário": "bg-violet-50 text-violet-700 border-violet-200",
  "Ação Comunitária": "bg-rose-50 text-rose-700 border-rose-200",
  "Hospital Universitário": "bg-amber-50 text-amber-700 border-amber-200",
};

const ALL_TYPES = ["Todos", "Clínica-Escola", "Serviço SUS", "Projeto Universitário", "Ação Comunitária", "Hospital Universitário"];

// ─── Sub-components ───────────────────────────────────────────────────────────

function ServiceCard({ s }: { s: Service }) {
  return (
    <div className="bg-card rounded-2xl border border-border p-5 flex flex-col gap-4 hover:shadow-lg hover:shadow-black/5 transition-all duration-200">
      <div className="flex flex-wrap gap-2 justify-between">
        <h3 className="text-base font-semibold text-foreground leading-snug flex-1 min-w-0">
          {s.name}
        </h3>
        <div className="flex flex-wrap gap-1.5 flex-shrink-0">
          <span
            className={`text-xs px-2 py-0.5 rounded-full border font-medium whitespace-nowrap ${
              TYPE_BADGES[s.type] ?? "bg-gray-50 text-gray-700 border-gray-200"
            }`}
          >
            {s.type}
          </span>
          <span
            className={`text-xs px-2 py-0.5 rounded-full border font-medium whitespace-nowrap ${
              s.isFree
                ? "bg-green-50 text-green-700 border-green-200"
                : "bg-amber-50 text-amber-700 border-amber-200"
            }`}
          >
            {s.isFree ? "Gratuito" : `Valor Social`}
          </span>
        </div>
      </div>

      {!s.isFree && s.costValue && (
        <p className="text-sm text-amber-700 font-medium -mt-2">
          Valor: {s.costValue}
        </p>
      )}

      <div className="grid gap-2.5 text-sm text-muted-foreground">
        <div className="flex items-start gap-2.5">
          <Users className="w-4 h-4 mt-0.5 shrink-0 text-primary" />
          <span>
            <span className="text-foreground font-medium">Público: </span>
            {s.audience}
          </span>
        </div>
        <div className="flex items-start gap-2.5">
          <MapPin className="w-4 h-4 mt-0.5 shrink-0 text-primary" />
          <span>
            {s.address} — {s.neighborhood}, {s.city}/{s.state}
          </span>
        </div>
        <div className="flex items-center gap-2.5">
          {s.isWhatsApp ? (
            <MessageCircle className="w-4 h-4 shrink-0 text-primary" />
          ) : (
            <Phone className="w-4 h-4 shrink-0 text-primary" />
          )}
          <span>
            {s.isWhatsApp ? "WhatsApp: " : "Tel: "}
            <span className="text-foreground">{s.phone}</span>
          </span>
        </div>
        <div className="flex items-center gap-2.5">
          <Clock className="w-4 h-4 shrink-0 text-primary" />
          <span>{s.hours}</span>
        </div>
        <div className="flex items-start gap-2.5">
          <Info className="w-4 h-4 mt-0.5 shrink-0 text-primary" />
          <span>
            <span className="text-foreground font-medium">Como solicitar: </span>
            {s.howToRequest}
          </span>
        </div>
      </div>

      <div className="flex items-center justify-between pt-3 border-t border-border">
        <span className="text-xs text-muted-foreground flex items-center gap-1">
          <Calendar className="w-3 h-3" />
          Atualizado em {s.lastUpdated}
        </span>
        {s.contactLink ? (
          <a
            href={s.contactLink}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-xs text-primary font-semibold hover:underline"
          >
            Acessar site <ExternalLink className="w-3 h-3" />
          </a>
        ) : (
          <span className="text-xs text-muted-foreground">Contato via {s.isWhatsApp ? "WhatsApp" : "telefone"}</span>
        )}
      </div>
    </div>
  );
}

function ArticleCard({ a }: { a: Article }) {
  const categoryColors: Record<string, string> = {
    "Imunidade": "bg-emerald-50 text-emerald-700",
    "Alimentação Acessível": "bg-amber-50 text-amber-700",
    "Gestação": "bg-rose-50 text-rose-700",
    "Política de Saúde": "bg-violet-50 text-violet-700",
  };

  return (
    <div className="bg-card rounded-2xl border border-border overflow-hidden hover:shadow-lg hover:shadow-black/5 transition-all duration-200 flex flex-col">
      <div className="h-44 bg-muted overflow-hidden">
        <img
          src={a.imageUrl}
          alt={a.title}
          className="w-full h-full object-cover hover:scale-105 transition-transform duration-500"
        />
      </div>
      <div className="p-5 flex flex-col gap-3 flex-1">
        <div className="flex items-center gap-2">
          <span
            className={`text-xs px-2.5 py-0.5 rounded-full font-medium ${
              categoryColors[a.category] ?? "bg-gray-50 text-gray-700"
            }`}
          >
            {a.category}
          </span>
          <span className="text-xs text-muted-foreground">{a.readTime} de leitura</span>
        </div>
        <h3 className="text-base font-semibold text-foreground leading-snug">{a.title}</h3>
        <p className="text-sm text-muted-foreground leading-relaxed flex-1">{a.excerpt}</p>
        <div className="pt-3 border-t border-border">
          <p className="text-xs font-semibold text-foreground">{a.author}</p>
          <p className="text-xs text-muted-foreground">{a.credential}</p>
        </div>
      </div>
    </div>
  );
}

// ─── Main App ─────────────────────────────────────────────────────────────────

export default function App() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [costFilter, setCostFilter] = useState<"all" | "free" | "social">("all");
  const [typeFilter, setTypeFilter] = useState("Todos");
  const [contactForm, setContactForm] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 24);
    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  function scrollTo(id: string) {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  }

  const filteredServices = SERVICES.filter((s) => {
    const q = searchQuery.toLowerCase();
    const matchQuery =
      q === "" ||
      s.name.toLowerCase().includes(q) ||
      s.city.toLowerCase().includes(q) ||
      s.neighborhood.toLowerCase().includes(q) ||
      s.state.toLowerCase().includes(q);
    const matchCost =
      costFilter === "all" ||
      (costFilter === "free" && s.isFree) ||
      (costFilter === "social" && !s.isFree);
    const matchType = typeFilter === "Todos" || s.type === typeFilter;
    return matchQuery && matchCost && matchType;
  });

  function handleContactSubmit(e: React.FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  const navLinks = [
    { label: "Início", id: "inicio" },
    { label: "Atendimento", id: "atendimento" },
    { label: "Serviços", id: "servicos" },
    { label: "Clínicas-Escola", id: "clinicas" },
    { label: "Conteúdos", id: "conteudos" },
    { label: "Sobre", id: "sobre" },
    { label: "Contato", id: "contato" },
  ];

  return (
    <div className="min-h-screen bg-background text-foreground">

      {/* ── Navbar ──────────────────────────────────────────────────────────── */}
      <header
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
          scrolled ? "bg-[#f5f0eb]/95 backdrop-blur-md shadow-sm" : "bg-[#f5f0eb]"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 h-16 flex items-center justify-between">
          {/* Logo */}
          <button onClick={() => scrollTo("inicio")} className="flex items-center gap-2 shrink-0">
            <div className="w-10 h-10 rounded-lg overflow-hidden bg-[#f5f0eb]">
              <ImageWithFallback
                src={logoImage}
                alt="NutriAcesso logo"
                className="w-full h-full object-contain"
              />
            </div>
            <span className="font-bold text-lg leading-none">
              <span className="text-primary">Nutri</span>
              <span className="text-accent">Acesso</span>
            </span>
          </button>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-6">
            {navLinks.map((l) => (
              <button
                key={l.id}
                onClick={() => scrollTo(l.id)}
                className="text-sm text-muted-foreground hover:text-primary font-medium transition-colors"
              >
                {l.label}
              </button>
            ))}
          </nav>

          {/* CTA + mobile trigger */}
          <div className="flex items-center gap-3">
            <button
              onClick={() => scrollTo("atendimento")}
              className="hidden sm:flex items-center gap-1.5 bg-primary text-primary-foreground text-sm font-semibold px-4 py-2 rounded-full hover:bg-primary/90 transition-colors"
            >
              <Search className="w-3.5 h-3.5" />
              Encontrar atendimento
            </button>
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden p-2 rounded-lg hover:bg-muted transition-colors"
              aria-label="Menu"
            >
              {menuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile menu */}
        {menuOpen && (
          <div className="lg:hidden bg-card border-t border-border px-4 py-4 flex flex-col gap-1">
            {navLinks.map((l) => (
              <button
                key={l.id}
                onClick={() => scrollTo(l.id)}
                className="text-left px-3 py-2.5 rounded-lg text-sm font-medium text-foreground hover:bg-muted transition-colors"
              >
                {l.label}
              </button>
            ))}
            <button
              onClick={() => scrollTo("atendimento")}
              className="mt-2 w-full bg-primary text-primary-foreground text-sm font-semibold px-4 py-2.5 rounded-full hover:bg-primary/90 transition-colors"
            >
              Encontrar atendimento
            </button>
          </div>
        )}
      </header>

      {/* ── Hero ────────────────────────────────────────────────────────────── */}
      <section id="inicio" className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-16 lg:py-24 grid lg:grid-cols-2 gap-12 items-center">
          {/* Text column */}
          <div className="flex flex-col gap-6">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-xs font-semibold px-3 py-1.5 rounded-full w-fit">
              <Leaf className="w-3.5 h-3.5" />
              Nutrição que acolhe
            </div>
            <h1 className="text-4xl lg:text-5xl font-bold text-foreground leading-tight">
              Nutrição de qualidade{" "}
              <span className="text-primary">ao alcance</span>{" "}
              de todos
            </h1>
            <p className="text-lg text-muted-foreground leading-relaxed">
              Encontre atendimentos nutricionais gratuitos e acessíveis perto de você —
              clínicas-escola, serviços do SUS, projetos universitários e ações comunitárias.
            </p>

            {/* Search bar */}
            <div className="bg-card border border-border rounded-2xl p-3 flex flex-col sm:flex-row gap-3 shadow-sm">
              <div className="flex items-center gap-2 flex-1 px-2">
                <Search className="w-4 h-4 text-muted-foreground shrink-0" />
                <input
                  type="text"
                  placeholder="Buscar por cidade, bairro ou serviço..."
                  value={searchQuery}
                  onChange={(e) => {
                    setSearchQuery(e.target.value);
                    if (e.target.value) scrollTo("atendimento");
                  }}
                  className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
                />
              </div>
              <button
                onClick={() => scrollTo("atendimento")}
                className="bg-primary text-primary-foreground text-sm font-semibold px-6 py-2.5 rounded-xl hover:bg-primary/90 transition-colors flex items-center gap-2 justify-center"
              >
                <Search className="w-4 h-4" />
                Buscar
              </button>
            </div>

            {/* Quick links */}
            <div className="flex flex-wrap gap-2">
              {["Serviços Gratuitos", "Clínicas-Escola", "Projetos Universitários", "SUS"].map((tag) => (
                <button
                  key={tag}
                  onClick={() => scrollTo("atendimento")}
                  className="text-xs px-3 py-1.5 bg-card border border-border rounded-full text-muted-foreground hover:text-primary hover:border-primary transition-colors"
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>

          {/* Image column */}
          <div className="relative rounded-3xl overflow-hidden h-80 lg:h-[480px] bg-muted">
            <img
              src="https://images.unsplash.com/photo-1770223722037-8dc5d3dff8d3?w=900&h=600&fit=crop&auto=format"
              alt="Nutricionista apresentando prato saudável a uma pessoa"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent" />
            {/* Floating badge */}
            <div className="absolute bottom-5 left-5 bg-card/90 backdrop-blur-sm rounded-xl px-4 py-3 flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <CheckCircle className="w-5 h-5 text-primary" />
              </div>
              <div>
                <p className="text-xs font-bold text-foreground">500+ serviços cadastrados</p>
                <p className="text-xs text-muted-foreground">em todo o Brasil</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── Stats ───────────────────────────────────────────────────────────── */}
      <div className="bg-primary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-10 grid grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { value: "500+", label: "Serviços cadastrados" },
            { value: "150+", label: "Cidades atendidas" },
            { value: "20", label: "Estados cobertos" },
            { value: "100%", label: "Acesso gratuito à plataforma" },
          ].map((stat) => (
            <div key={stat.label} className="text-center">
              <p className="text-3xl font-bold text-primary-foreground">{stat.value}</p>
              <p className="text-sm text-primary-foreground/70 mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Tipos de Serviço ─────────────────────────────────────────────────── */}
      <section id="servicos" className="max-w-7xl mx-auto px-4 sm:px-6 py-20">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground">Tipos de atendimento</h2>
          <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
            Conheça as modalidades de serviços de nutrição disponíveis gratuitamente ou com valor social.
          </p>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            {
              label: "Serviços do SUS",
              desc: "Atendimento nutricional pelo Sistema Único de Saúde, gratuito e universal, nas UBSs e hospitais.",
              Icon: Stethoscope,
              bg: "bg-emerald-50",
              icon: "text-emerald-700",
              border: "border-emerald-100",
              hover: "hover:border-emerald-300",
            },
            {
              label: "Clínicas-Escola",
              desc: "Atendimento supervisionado por docentes em faculdades públicas e privadas de nutrição.",
              Icon: GraduationCap,
              bg: "bg-blue-50",
              icon: "text-blue-700",
              border: "border-blue-100",
              hover: "hover:border-blue-300",
            },
            {
              label: "Projetos Universitários",
              desc: "Extensão universitária levando nutrição gratuita e orientação alimentar às comunidades.",
              Icon: BookOpen,
              bg: "bg-violet-50",
              icon: "text-violet-700",
              border: "border-violet-100",
              hover: "hover:border-violet-300",
            },
            {
              label: "Ações Comunitárias",
              desc: "ONGs, associações e coletivos que oferecem atendimento com valor social e acolhimento.",
              Icon: HeartHandshake,
              bg: "bg-rose-50",
              icon: "text-rose-700",
              border: "border-rose-100",
              hover: "hover:border-rose-300",
            },
          ].map((item) => (
            <button
              key={item.label}
              onClick={() => scrollTo("atendimento")}
              className={`text-left p-6 rounded-2xl border ${item.border} ${item.hover} bg-card transition-all duration-200 group`}
            >
              <div className={`w-12 h-12 rounded-xl ${item.bg} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <item.Icon className={`w-6 h-6 ${item.icon}`} />
              </div>
              <h3 className="font-semibold text-foreground mb-2">{item.label}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{item.desc}</p>
              <div className={`flex items-center gap-1 mt-4 text-xs font-semibold ${item.icon}`}>
                Ver serviços <ChevronRight className="w-3.5 h-3.5" />
              </div>
            </button>
          ))}
        </div>
      </section>

      {/* ── Encontrar Atendimento ────────────────────────────────────────────── */}
      <section id="atendimento" className="bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-foreground">Encontrar atendimento</h2>
            <p className="text-muted-foreground mt-3 max-w-xl mx-auto">
              Busque serviços por cidade, bairro ou nome. Filtre por tipo de atendimento e custo.
            </p>
          </div>

          {/* Search & Filters */}
          <div className="bg-card rounded-2xl border border-border p-4 mb-8 flex flex-col gap-4">
            {/* Search input */}
            <div className="flex items-center gap-2 bg-input-background rounded-xl px-4 py-3">
              <Search className="w-4 h-4 text-muted-foreground shrink-0" />
              <input
                type="text"
                placeholder="Cidade, bairro ou nome do serviço..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-transparent text-sm text-foreground placeholder:text-muted-foreground outline-none"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery("")}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>

            {/* Filter row */}
            <div className="flex flex-wrap gap-3 items-center">
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
                <Filter className="w-3.5 h-3.5" />
                Custo:
              </div>
              {(["all", "free", "social"] as const).map((f) => {
                const labels = { all: "Todos", free: "Gratuito", social: "Valor Social" };
                return (
                  <button
                    key={f}
                    onClick={() => setCostFilter(f)}
                    className={`text-xs px-3 py-1.5 rounded-full font-medium border transition-colors ${
                      costFilter === f
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-background text-muted-foreground border-border hover:border-primary hover:text-primary"
                    }`}
                  >
                    {labels[f]}
                  </button>
                );
              })}
              <div className="w-px h-4 bg-border hidden sm:block" />
              <div className="flex items-center gap-1.5 text-xs text-muted-foreground font-medium">
                Tipo:
              </div>
              <div className="flex flex-wrap gap-1.5">
                {ALL_TYPES.map((t) => (
                  <button
                    key={t}
                    onClick={() => setTypeFilter(t)}
                    className={`text-xs px-3 py-1.5 rounded-full font-medium border transition-colors ${
                      typeFilter === t
                        ? "bg-primary text-primary-foreground border-primary"
                        : "bg-background text-muted-foreground border-border hover:border-primary hover:text-primary"
                    }`}
                  >
                    {t}
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Results */}
          {filteredServices.length === 0 ? (
            <div className="text-center py-16">
              <div className="w-14 h-14 bg-muted rounded-2xl flex items-center justify-center mx-auto mb-4">
                <Search className="w-7 h-7 text-muted-foreground" />
              </div>
              <p className="text-foreground font-semibold">Nenhum serviço encontrado</p>
              <p className="text-muted-foreground text-sm mt-2">
                Tente outros termos ou remova alguns filtros.
              </p>
              <button
                onClick={() => { setSearchQuery(""); setCostFilter("all"); setTypeFilter("Todos"); }}
                className="mt-4 text-sm text-primary font-semibold hover:underline"
              >
                Limpar filtros
              </button>
            </div>
          ) : (
            <>
              <p className="text-sm text-muted-foreground mb-5">
                {filteredServices.length} serviço{filteredServices.length !== 1 ? "s" : ""} encontrado
                {filteredServices.length !== 1 ? "s" : ""}
              </p>
              <div className="grid md:grid-cols-2 xl:grid-cols-2 gap-5">
                {filteredServices.map((s) => (
                  <ServiceCard key={s.id} s={s} />
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* ── Clínicas-Escola ──────────────────────────────────────────────────── */}
      <section id="clinicas" className="max-w-7xl mx-auto px-4 sm:px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div>
            <div className="inline-flex items-center gap-2 bg-blue-50 text-blue-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-5">
              <GraduationCap className="w-3.5 h-3.5" />
              Clínicas-Escola e Projetos Universitários
            </div>
            <h2 className="text-3xl font-bold text-foreground mb-5 leading-snug">
              Atendimento de qualidade produzido nas universidades
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-6">
              As clínicas-escola são espaços dentro de faculdades e universidades onde estudantes
              de Nutrição realizam atendimentos supervisionados por professores especialistas.
              O serviço é gratuito ou tem valor social e segue os mesmos protocolos de um consultório particular.
            </p>
            <ul className="flex flex-col gap-3">
              {[
                "Atendimento individual e personalizado",
                "Supervisão de professores nutricionistas",
                "Seguimento e retornos incluídos",
                "Elaboração de plano alimentar completo",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2.5 text-sm text-foreground">
                  <CheckCircle className="w-4 h-4 text-primary shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
            <button
              onClick={() => { setTypeFilter("Clínica-Escola"); scrollTo("atendimento"); }}
              className="mt-8 inline-flex items-center gap-2 bg-primary text-primary-foreground text-sm font-semibold px-5 py-2.5 rounded-full hover:bg-primary/90 transition-colors"
            >
              Ver clínicas-escola <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Right side: highlighted clinic cards */}
          <div className="flex flex-col gap-4">
            {SERVICES.filter((s) => s.type === "Clínica-Escola").map((s) => (
              <div key={s.id} className="bg-card border border-border rounded-2xl p-5">
                <div className="flex justify-between items-start gap-3 mb-3">
                  <h3 className="font-semibold text-foreground text-sm leading-snug">{s.name}</h3>
                  <span
                    className={`text-xs px-2 py-0.5 rounded-full border font-medium shrink-0 ${
                      s.isFree
                        ? "bg-green-50 text-green-700 border-green-200"
                        : "bg-amber-50 text-amber-700 border-amber-200"
                    }`}
                  >
                    {s.isFree ? "Gratuito" : `Valor Social${s.costValue ? " · " + s.costValue : ""}`}
                  </span>
                </div>
                <div className="grid gap-1.5 text-xs text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-3.5 h-3.5 text-primary" />
                    {s.neighborhood}, {s.city}/{s.state}
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="w-3.5 h-3.5 text-primary" />
                    {s.hours}
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-3.5 h-3.5 text-primary" />
                    {s.phone}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Conteúdos ───────────────────────────────────────────────────────── */}
      <section id="conteudos" className="bg-secondary">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-20">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
            <div>
              <h2 className="text-3xl font-bold text-foreground">Conteúdos sobre Nutrição</h2>
              <p className="text-muted-foreground mt-2">
                Artigos e guias produzidos por nutricionistas e pesquisadores.
              </p>
            </div>
            <button className="text-sm text-primary font-semibold hover:underline flex items-center gap-1 shrink-0">
              Ver todos os conteúdos <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {ARTICLES.map((a) => (
              <ArticleCard key={a.id} a={a} />
            ))}
          </div>
        </div>
      </section>

      {/* ── Sobre ───────────────────────────────────────────────────────────── */}
      <section id="sobre" className="max-w-7xl mx-auto px-4 sm:px-6 py-20">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Image */}
          <div className="relative h-72 lg:h-[420px] rounded-3xl overflow-hidden bg-muted">
            <img
              src="https://images.unsplash.com/photo-1533777857889-4be7c70b33f7?w=800&h=600&fit=crop&auto=format"
              alt="Pessoa se alimentando de forma saudável"
              className="w-full h-full object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-br from-primary/20 to-accent/10" />
            {/* Floating logo card */}
            <div className="absolute top-5 left-5 bg-card/90 backdrop-blur-sm rounded-2xl p-4 flex items-center gap-3">
              <div className="w-12 h-12 rounded-xl overflow-hidden bg-[#f5f0eb]">
                <ImageWithFallback
                  src={logoImage}
                  alt="NutriAcesso"
                  className="w-full h-full object-contain"
                />
              </div>
              <div>
                <p className="text-sm font-bold text-foreground">
                  <span className="text-primary">Nutri</span>
                  <span className="text-accent">Acesso</span>
                </p>
                <p className="text-xs text-muted-foreground">Nutrição que acolhe</p>
              </div>
            </div>
          </div>

          {/* Text */}
          <div>
            <div className="inline-flex items-center gap-2 bg-primary/10 text-primary text-xs font-semibold px-3 py-1.5 rounded-full mb-6">
              <Heart className="w-3.5 h-3.5" />
              Sobre o projeto
            </div>
            <h2 className="text-3xl font-bold text-foreground mb-5 leading-snug">
              O acesso à nutrição é um direito, não um privilégio
            </h2>
            <p className="text-muted-foreground leading-relaxed mb-5">
              O <strong className="text-foreground">NutriAcesso</strong> nasceu da percepção de que
              muitos brasileiros desconhecem os serviços de nutrição gratuitos e acessíveis disponíveis
              em suas comunidades. Clínicas-escola, projetos universitários, serviços do SUS e ações
              comunitárias existem — mas ficam invisíveis para quem mais precisa deles.
            </p>
            <p className="text-muted-foreground leading-relaxed mb-8">
              Nossa plataforma conecta a população a esses serviços de forma simples, gratuita e confiável.
              Todas as informações são verificadas e atualizadas regularmente pelos responsáveis por cada serviço.
            </p>

            <div className="grid grid-cols-2 gap-5">
              {[
                { icon: Building2, title: "Transparência", text: "Dados verificados e atualizados" },
                { icon: Heart, title: "Acessibilidade", text: "Sem barreiras de renda ou digital" },
                { icon: Users, title: "Comunidade", text: "Conectando pessoas a serviços" },
                { icon: Leaf, title: "Saúde", text: "Nutrição como ferramenta de cidadania" },
              ].map((item) => (
                <div key={item.title} className="flex items-start gap-3">
                  <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                    <item.icon className="w-4 h-4 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">{item.title}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{item.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Contato ─────────────────────────────────────────────────────────── */}
      <section id="contato" className="bg-secondary">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 py-20">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-foreground">Fale conosco</h2>
            <p className="text-muted-foreground mt-3">
              Dúvidas, sugestões ou quer cadastrar um serviço? Entre em contato.
            </p>
          </div>

          <div className="grid lg:grid-cols-5 gap-10">
            {/* Contact info */}
            <div className="lg:col-span-2 flex flex-col gap-6">
              <div>
                <h3 className="font-semibold text-foreground mb-4">Informações de contato</h3>
                <div className="flex flex-col gap-4">
                  {[
                    { Icon: Mail, label: "E-mail", value: "contato@nutriacesso.org.br" },
                    { Icon: MessageCircle, label: "WhatsApp", value: "(11) 99000-0000" },
                    { Icon: Instagram, label: "Instagram", value: "@nutriacesso" },
                    { Icon: Facebook, label: "Facebook", value: "NutriAcesso" },
                  ].map((item) => (
                    <div key={item.label} className="flex items-center gap-3">
                      <div className="w-9 h-9 rounded-xl bg-primary/10 flex items-center justify-center shrink-0">
                        <item.Icon className="w-4 h-4 text-primary" />
                      </div>
                      <div>
                        <p className="text-xs text-muted-foreground">{item.label}</p>
                        <p className="text-sm font-medium text-foreground">{item.value}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div className="bg-primary/10 rounded-2xl p-5">
                <p className="text-sm font-semibold text-primary mb-2">Quer cadastrar um serviço?</p>
                <p className="text-sm text-muted-foreground">
                  Se você representa uma clínica-escola, projeto universitário ou ação comunitária
                  e quer aparecer aqui, nos envie um e-mail com os dados do serviço.
                </p>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-3 bg-card rounded-2xl border border-border p-6">
              {submitted ? (
                <div className="h-full flex flex-col items-center justify-center gap-4 py-10 text-center">
                  <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center">
                    <CheckCircle className="w-7 h-7 text-primary" />
                  </div>
                  <h3 className="text-lg font-bold text-foreground">Mensagem enviada!</h3>
                  <p className="text-sm text-muted-foreground max-w-xs">
                    Obrigado pelo contato. Retornaremos em até 2 dias úteis.
                  </p>
                  <button
                    onClick={() => { setSubmitted(false); setContactForm({ name: "", email: "", message: "" }); }}
                    className="text-sm text-primary font-semibold hover:underline"
                  >
                    Enviar outra mensagem
                  </button>
                </div>
              ) : (
                <form onSubmit={handleContactSubmit} className="flex flex-col gap-4">
                  <div>
                    <label className="text-sm font-medium text-foreground block mb-1.5">
                      Nome completo
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Seu nome"
                      value={contactForm.name}
                      onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                      className="w-full bg-input-background rounded-xl px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none border border-transparent focus:border-primary transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground block mb-1.5">
                      E-mail
                    </label>
                    <input
                      type="email"
                      required
                      placeholder="seu@email.com"
                      value={contactForm.email}
                      onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                      className="w-full bg-input-background rounded-xl px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none border border-transparent focus:border-primary transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-sm font-medium text-foreground block mb-1.5">
                      Mensagem
                    </label>
                    <textarea
                      required
                      rows={5}
                      placeholder="Escreva sua mensagem aqui..."
                      value={contactForm.message}
                      onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                      className="w-full bg-input-background rounded-xl px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground outline-none border border-transparent focus:border-primary transition-colors resize-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="flex items-center justify-center gap-2 bg-primary text-primary-foreground font-semibold py-3 rounded-xl hover:bg-primary/90 transition-colors mt-1"
                  >
                    <Send className="w-4 h-4" />
                    Enviar mensagem
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* ── Footer ──────────────────────────────────────────────────────────── */}
      <footer className="bg-foreground text-primary-foreground">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-14">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10 mb-12">
            {/* Brand */}
            <div className="lg:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-10 h-10 rounded-lg overflow-hidden bg-[#f5f0eb]">
                  <ImageWithFallback
                    src={logoImage}
                    alt="NutriAcesso"
                    className="w-full h-full object-contain"
                  />
                </div>
                <span className="font-bold text-lg">
                  <span className="text-[#8fc084]">Nutri</span>
                  <span className="text-[#d4a0a6]">Acesso</span>
                </span>
              </div>
              <p className="text-sm text-primary-foreground/60 leading-relaxed max-w-xs">
                Conectando a população brasileira a serviços de nutrição gratuitos e
                acessíveis. Nutrição que acolhe.
              </p>
              <div className="flex items-center gap-3 mt-5">
                {[Instagram, Facebook].map((Icon, i) => (
                  <div
                    key={i}
                    className="w-8 h-8 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors cursor-pointer"
                  >
                    <Icon className="w-4 h-4 text-primary-foreground/70" />
                  </div>
                ))}
              </div>
            </div>

            {/* Links */}
            <div>
              <h4 className="text-sm font-semibold text-primary-foreground mb-4">Navegação</h4>
              <ul className="flex flex-col gap-2.5">
                {navLinks.map((l) => (
                  <li key={l.id}>
                    <button
                      onClick={() => scrollTo(l.id)}
                      className="text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors"
                    >
                      {l.label}
                    </button>
                  </li>
                ))}
              </ul>
            </div>

            {/* Serviços */}
            <div>
              <h4 className="text-sm font-semibold text-primary-foreground mb-4">Serviços</h4>
              <ul className="flex flex-col gap-2.5">
                {["Clínicas-Escola", "Serviços do SUS", "Projetos Universitários", "Ações Comunitárias", "Conteúdos educativos"].map(
                  (item) => (
                    <li key={item}>
                      <button
                        onClick={() => scrollTo("servicos")}
                        className="text-sm text-primary-foreground/60 hover:text-primary-foreground transition-colors text-left"
                      >
                        {item}
                      </button>
                    </li>
                  )
                )}
              </ul>
            </div>
          </div>

          <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row justify-between gap-3">
            <p className="text-xs text-primary-foreground/40">
              © 2024 NutriAcesso. Todos os direitos reservados.
            </p>
            <p className="text-xs text-primary-foreground/40">
              As informações são atualizadas pelos responsáveis de cada serviço. Verifique sempre antes de ir.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
