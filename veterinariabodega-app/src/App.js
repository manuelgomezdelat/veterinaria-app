import React, { useState } from 'react';
import { 
  Package, AlertCircle, FileText, TrendingUp, Search, 
  ChevronRight, Calendar, Clock, Check, ArrowLeft, Plus, 
  Users, BarChart3, ClipboardCheck, RefreshCw, Building2, 
  PackageCheck, XCircle, CheckCircle, DollarSign, Camera, X 
} from 'lucide-react';
import './App.css';

function App() {
  const [userProfile, setUserProfile] = useState('asistente');
  const [currentScreen, setCurrentScreen] = useState('dashboard');
  const [selectedSede, setSelectedSede] = useState('Matriz');
  const [selectedProduct, setSelectedProduct] = useState(null);
  
  const [recepcionData, setRecepcionData] = useState({
    proveedor: '',
    factura: '',
    foto: false,
    productos: []
  });

  const [productoTempRecepcion, setProductoTempRecepcion] = useState({
    producto: '',
    cantidad: '',
    lote: '',
    vencimiento: ''
  });

  const [transferenciaData, setTransferenciaData] = useState({
    origen: 'Matriz',
    destino: 'Urdesa',
    motivo: '',
    productos: []
  });

  const [productoTempTransferencia, setProductoTempTransferencia] = useState({
    producto: '',
    cantidad: ''
  });

  const [conteoData, setConteoData] = useState({
    foto: false,
    productos: []
  });

  const [productoTempConteo, setProductoTempConteo] = useState({
    producto: '',
    stockSistema: 0,
    stockFisico: '',
    diferencia: 0
  });

  const [nuevoProductoData, setNuevoProductoData] = useState({
    nombre: '',
    categoria: '',
    unidad: 'unidades',
    stockMinimo: '',
    precioCompra: '',
    precioVenta: ''
  });

  const userName = userProfile === 'asistente' ? "María González" : "Carlos Méndez";
  const userRole = userProfile === 'asistente' ? "Asistente de Compras" : "Auxiliar de Bodega - Matriz";

  const products = [
    { id: 1, name: 'Amoxicilina 500mg', stock: 45, minStock: 50, category: 'Antibióticos', sede: 'Matriz' },
    { id: 2, name: 'Antiparasitario Canino', stock: 15, minStock: 50, category: 'Antiparasitarios', sede: 'Matriz' },
    { id: 3, name: 'Vitamina B12', stock: 8, minStock: 30, category: 'Vitaminas', sede: 'Urdesa' },
    { id: 4, name: 'Jeringa 5ml', stock: 45, minStock: 100, category: 'Material Médico', sede: 'Matriz' },
    { id: 5, name: 'Suero Fisiológico', stock: 120, minStock: 80, category: 'Soluciones', sede: 'Matriz' }
  ];

  const proveedores = ['Proveedor A', 'Proveedor B', 'Veterinaria Central', 'Distribuidora Med'];
  const categorias = ['Antibióticos', 'Antiparasitarios', 'Vitaminas', 'Material Médico', 'Soluciones', 'Vacunas'];

  const pendingBajas = [
    { id: 1, product: 'Amoxicilina 500mg', quantity: '10 tabletas', reason: 'Producto Vencido', requestedBy: 'Dr. Juan Pérez', date: '15/12/2025', amount: 25.50, foto: true },
    { id: 2, product: 'Jeringa 10ml', quantity: '5 unidades', reason: 'Daño/Rotura', requestedBy: 'Dra. Ana Torres', date: '15/12/2025', amount: 8.75, foto: true },
    { id: 3, product: 'Suero Fisiológico', quantity: '250 ml', reason: 'Contaminación', requestedBy: 'Dr. Luis Mora', date: '14/12/2025', amount: 12.00, foto: true },
    { id: 4, product: 'Antiparasitario Canino', quantity: '20 unidades', reason: 'Defecto de Fábrica', requestedBy: 'Carlos Méndez', date: '14/12/2025', amount: 125.00, foto: true, requiereGerencia: true }
  ];

  const stockAlerts = [
    { product: 'Antiparasitario Canino', currentStock: 15, minStock: 50, sede: 'Matriz' },
    { product: 'Vitamina B12', currentStock: 8, minStock: 30, sede: 'Urdesa' },
    { product: 'Jeringa 5ml', currentStock: 45, minStock: 100, sede: 'Matriz' }
  ];

  const vencimientoProximo = [
    { product: 'Amoxicilina 500mg', lote: 'L2024-001', vencimiento: '28/02/2025', dias: 74, sede: 'Matriz' },
    { product: 'Antiparasitario', lote: 'L2024-009', vencimiento: '15/03/2025', dias: 89, sede: 'Urdesa' }
  ];

  const consumosMedicos = [
    { id: 1, medico: 'Dr. Juan Pérez', producto: 'Amoxicilina 500mg', cantidad: '5 tabletas', paciente: 'Max - Canino', procedimiento: 'Infección respiratoria', fecha: '15/12/2025', hora: '10:30', autorizado: false },
    { id: 2, medico: 'Dra. Ana Torres', producto: 'Suero Fisiológico', cantidad: '500 ml', paciente: 'Luna - Felino', procedimiento: 'Hidratación', fecha: '15/12/2025', hora: '11:15', autorizado: false },
    { id: 3, medico: 'Dr. Luis Mora', producto: 'Jeringa 10ml', cantidad: '3 unidades', paciente: 'Rocky - Canino', procedimiento: 'Vacunación', fecha: '15/12/2025', hora: '12:00', autorizado: false },
    { id: 4, medico: 'Dr. Juan Pérez', producto: 'Antiparasitario', cantidad: '10 ml', paciente: 'Michi - Felino', procedimiento: 'Desparasitación', fecha: '15/12/2025', hora: '14:30', autorizado: false },
    { id: 5, medico: 'Dra. Ana Torres', producto: 'Vitamina B12', cantidad: '2 ml', paciente: 'Bobby - Canino', procedimiento: 'Suplementación', fecha: '15/12/2025', hora: '15:45', autorizado: true },
    { id: 6, medico: 'Dr. Luis Mora', producto: 'Amoxicilina 500mg', cantidad: '8 tabletas', paciente: 'Pelusa - Felino', procedimiento: 'Post-cirugía', fecha: '14/12/2025', hora: '09:20', autorizado: true },
    { id: 7, medico: 'Dr. Juan Pérez', producto: 'Suero Fisiológico', cantidad: '250 ml', paciente: 'Rex - Canino', procedimiento: 'Rehidratación', fecha: '14/12/2025', hora: '16:00', autorizado: true }
  ];

  const inventarioCompleto = [
    { id: 1, name: 'Amoxicilina 500mg', stock: 45, minStock: 50, category: 'Antibióticos', sede: 'Matriz', precio: 0.85, lote: 'L2024-001', vencimiento: '28/02/2025' },
    { id: 2, name: 'Antiparasitario Canino', stock: 15, minStock: 50, category: 'Antiparasitarios', sede: 'Matriz', precio: 12.50, lote: 'L2024-002', vencimiento: '30/06/2025' },
    { id: 3, name: 'Vitamina B12', stock: 8, minStock: 30, category: 'Vitaminas', sede: 'Urdesa', precio: 3.20, lote: 'L2024-003', vencimiento: '15/05/2025' },
    { id: 4, name: 'Jeringa 5ml', stock: 45, minStock: 100, category: 'Material Médico', sede: 'Matriz', precio: 0.25, lote: 'L2024-004', vencimiento: '31/12/2026' },
    { id: 5, name: 'Suero Fisiológico', stock: 120, minStock: 80, category: 'Soluciones', sede: 'Matriz', precio: 1.50, lote: 'L2024-005', vencimiento: '20/08/2025' }
  ];

  // Dashboard del Asistente de Compras
  const AsistenteDashboard = () => (
    <div className="app-container">
      <div className="header header-purple">
        <div className="header-content">
          <div>
            <h1 className="header-title">Sistema de Gestión de Inventario</h1>
            <p className="header-subtitle">{userRole}</p>
          </div>
          <button 
            onClick={() => setUserProfile('auxiliar')}
            className="avatar-button avatar-purple"
          >
            {userName.split(' ').map(n => n[0]).join('')}
          </button>
        </div>
        <p className="header-welcome">Bienvenido, {userName}</p>
      </div>

      <div className="content-wrapper">
        <div className="stats-grid">
          <div className="stat-card stat-purple">
            <div className="stat-content">
              <div>
                <p className="stat-number">{pendingBajas.length}</p>
                <p className="stat-label">Solicitudes Pendientes</p>
              </div>
              <div className="stat-icon stat-icon-purple">
                <AlertCircle size={20} />
              </div>
            </div>
          </div>

          <div className="stat-card stat-orange">
            <div className="stat-content">
              <div>
                <p className="stat-number">{stockAlerts.length}</p>
                <p className="stat-label">Alertas de Stock</p>
              </div>
              <div className="stat-icon stat-icon-orange">
                <TrendingUp size={20} />
              </div>
            </div>
          </div>

          <div className="stat-card stat-blue">
            <div className="stat-content">
              <div>
                <p className="stat-number">{inventarioCompleto.length}</p>
                <p className="stat-label">Productos Activos</p>
              </div>
              <div className="stat-icon stat-icon-blue">
                <Package size={20} />
              </div>
            </div>
          </div>

          <div className="stat-card stat-green">
            <div className="stat-content">
              <div>
                <p className="stat-number">$89K</p>
                <p className="stat-label">Valor Inventario</p>
              </div>
              <div className="stat-icon stat-icon-green">
                <DollarSign size={20} />
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h3 className="card-title">
              <AlertCircle size={16} className="text-red" />
              Solicitudes de Baja Pendientes
            </h3>
            <button 
              onClick={() => setCurrentScreen('bajas-pendientes')}
              className="link-button"
            >
              Ver todas ({pendingBajas.length})
            </button>
          </div>
          <div className="card-list">
            {pendingBajas.slice(0, 2).map(baja => (
              <div key={baja.id} className="alert-card alert-red">
                <div className="alert-content">
                  <div className="alert-info">
                    <p className="alert-product">{baja.product}</p>
                    <p className="alert-details">{baja.quantity} • {baja.reason}</p>
                    <p className="alert-meta">Por: {baja.requestedBy}</p>
                    {baja.requiereGerencia && (
                      <span className="badge badge-warning">
                        ⚠️ Requiere aprobación de Gerencia
                      </span>
                    )}
                  </div>
                  <span className="alert-amount">${baja.amount}</span>
                </div>
                {!baja.requiereGerencia && (
                  <div className="button-group">
                    <button className="btn btn-success btn-small">Aprobar</button>
                    <button className="btn btn-secondary btn-small">Rechazar</button>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h3 className="card-title">
              <Users size={16} className="text-indigo" />
              Consumos Médicos Pendientes
            </h3>
            <button 
              onClick={() => setCurrentScreen('consumos-medicos')}
              className="link-button"
            >
              Ver todos ({consumosMedicos.filter(c => !c.autorizado).length})
            </button>
          </div>
          <div className="card-list">
            {consumosMedicos.filter(c => !c.autorizado).slice(0, 2).map(consumo => (
              <div key={consumo.id} className="alert-card alert-yellow">
                <div className="alert-content">
                  <div className="alert-info">
                    <p className="alert-product">{consumo.medico}</p>
                    <p className="alert-details">{consumo.producto} - {consumo.cantidad}</p>
                    <p className="alert-meta">Paciente: {consumo.paciente}</p>
                  </div>
                  <span className="badge badge-yellow">Pendiente</span>
                </div>
                <button 
                  onClick={() => alert('Consumo autorizado y registrado en el inventario')}
                  className="btn btn-indigo btn-full btn-small"
                >
                  Autorizar Consumo
                </button>
              </div>
            ))}
          </div>
        </div>

        <h2 className="section-title">Acciones Rápidas</h2>
        
        <div className="actions-grid">
          <button 
            onClick={() => setCurrentScreen('recepcion')}
            className="action-card action-blue"
          >
            <div className="action-icon action-icon-blue">
              <PackageCheck size={24} />
            </div>
            <p className="action-title">Recepción</p>
            <p className="action-subtitle">Registrar ingreso</p>
          </button>

          <button 
            onClick={() => setCurrentScreen('crear-producto')}
            className="action-card action-purple"
          >
            <div className="action-icon action-icon-purple">
              <Plus size={24} />
            </div>
            <p className="action-title">Nuevo Producto</p>
            <p className="action-subtitle">Crear producto</p>
          </button>

          <button 
            onClick={() => setCurrentScreen('transferencias')}
            className="action-card action-orange"
          >
            <div className="action-icon action-icon-orange">
              <RefreshCw size={24} />
            </div>
            <p className="action-title">Transferencias</p>
            <p className="action-subtitle">Entre sedes</p>
          </button>

          <button 
            onClick={() => setCurrentScreen('conteos')}
            className="action-card action-green"
          >
            <div className="action-icon action-icon-green">
              <ClipboardCheck size={24} />
            </div>
            <p className="action-title">Conteos</p>
            <p className="action-subtitle">Inventario físico</p>
          </button>

          <button 
            onClick={() => setCurrentScreen('consumos-medicos')}
            className="action-card action-indigo"
          >
            <div className="action-icon action-icon-indigo">
              <Users size={24} />
            </div>
            <p className="action-title">Consumos</p>
            <p className="action-subtitle">Por médico</p>
          </button>

          <button 
            onClick={() => setCurrentScreen('reportes')}
            className="action-card action-teal"
          >
            <div className="action-icon action-icon-teal">
              <BarChart3 size={24} />
            </div>
            <p className="action-title">Reportes</p>
            <p className="action-subtitle">Análisis</p>
          </button>

          <button 
            onClick={() => setCurrentScreen('inventario')}
            className="action-card action-gray"
          >
            <div className="action-icon action-icon-gray">
              <Package size={24} />
            </div>
            <p className="action-title">Inventario</p>
            <p className="action-subtitle">Ver productos</p>
          </button>

          <button 
            onClick={() => setCurrentScreen('log-auditoria')}
            className="action-card action-amber"
          >
            <div className="action-icon action-icon-amber">
              <FileText size={24} />
            </div>
            <p className="action-title">Log Auditoría</p>
            <p className="action-subtitle">Trazabilidad</p>
          </button>
        </div>

        <div className="info-card info-amber">
          <h3 className="info-title">
            <AlertCircle size={16} />
            Productos por Vencer
          </h3>
          {vencimientoProximo.map((item, idx) => (
            <div key={idx} className="info-item">
              • {item.product} ({item.sede}) - {item.dias} días
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Dashboard del Auxiliar de Bodega
  const AuxiliarDashboard = () => (
    <div className="app-container">
      <div className="header header-blue">
        <div className="header-content">
          <div>
            <h1 className="header-title">Sistema de Gestión de Inventario</h1>
            <p className="header-subtitle">{userRole}</p>
          </div>
          <button 
            onClick={() => setUserProfile('asistente')}
            className="avatar-button avatar-blue"
          >
            {userName.split(' ').map(n => n[0]).join('')}
          </button>
        </div>
        <p className="header-welcome">Bienvenido, {userName}</p>
      </div>

      <div className="sede-selector">
        <button 
          onClick={() => setSelectedSede('Matriz')}
          className={`sede-button ${selectedSede === 'Matriz' ? 'sede-active' : ''}`}
        >
          <Building2 size={16} />
          Matriz
        </button>
        <button 
          onClick={() => setSelectedSede('Urdesa')}
          className={`sede-button ${selectedSede === 'Urdesa' ? 'sede-active' : ''}`}
        >
          <Building2 size={16} />
          Urdesa
        </button>
      </div>

      <div className="content-wrapper">
        <div className="stats-grid">
          <div className="stat-card stat-blue">
            <div className="stat-content">
              <div>
                <p className="stat-number">{inventarioCompleto.filter(p => p.sede === selectedSede).length}</p>
                <p className="stat-label">Productos en Stock</p>
              </div>
              <div className="stat-icon stat-icon-blue">
                <Package size={20} />
              </div>
            </div>
          </div>

          <div className="stat-card stat-orange">
            <div className="stat-content">
              <div>
                <p className="stat-number">{stockAlerts.filter(a => a.sede === selectedSede).length}</p>
                <p className="stat-label">Alertas Stock Bajo</p>
              </div>
              <div className="stat-icon stat-icon-orange">
                <AlertCircle size={20} />
              </div>
            </div>
          </div>

          <div className="stat-card stat-green">
            <div className="stat-content">
              <div>
                <p className="stat-number">15</p>
                <p className="stat-label">Entradas Hoy</p>
              </div>
              <div className="stat-icon stat-icon-green">
                <PackageCheck size={20} />
              </div>
            </div>
          </div>

          <div className="stat-card stat-purple">
            <div className="stat-content">
              <div>
                <p className="stat-number">32</p>
                <p className="stat-label">Salidas Hoy</p>
              </div>
              <div className="stat-icon stat-icon-purple">
                <TrendingUp size={20} />
              </div>
            </div>
          </div>
        </div>

        <div className="card">
          <div className="card-header">
            <h3 className="card-title">
              <AlertCircle size={16} className="text-orange" />
              Productos con Stock Bajo
            </h3>
            <button 
              onClick={() => setCurrentScreen('inventario')}
              className="link-button"
            >
              Ver todos
            </button>
          </div>
          <div className="card-list">
            {stockAlerts.filter(a => a.sede === selectedSede).slice(0, 2).map((alert, idx) => (
              <div key={idx} className="alert-card alert-orange">
                <p className="alert-product">{alert.product}</p>
                <div className="alert-stock-info">
                  <span className="alert-details">
                    Stock: <span className="text-orange-bold">{alert.currentStock}</span> / Mínimo: {alert.minStock}
                  </span>
                  <button className="link-button">Solicitar</button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <h2 className="section-title">Acciones Rápidas</h2>
        
        <div className="actions-grid">
          <button 
            onClick={() => setCurrentScreen('recepcion')}
            className="action-card action-blue"
          >
            <div className="action-icon action-icon-blue">
              <PackageCheck size={24} />
            </div>
            <p className="action-title">Recepción</p>
            <p className="action-subtitle">Registrar ingreso</p>
          </button>

          <button 
            onClick={() => setCurrentScreen('transferencias')}
            className="action-card action-orange"
          >
            <div className="action-icon action-icon-orange">
              <RefreshCw size={24} />
            </div>
            <p className="action-title">Transferencias</p>
            <p className="action-subtitle">Entre sedes</p>
          </button>

          <button 
            onClick={() => setCurrentScreen('conteos')}
            className="action-card action-green"
          >
            <div className="action-icon action-icon-green">
              <ClipboardCheck size={24} />
            </div>
            <p className="action-title">Conteos</p>
            <p className="action-subtitle">Inventario físico</p>
          </button>

          <button 
            onClick={() => setCurrentScreen('consumos-medicos')}
            className="action-card action-indigo"
          >
            <div className="action-icon action-icon-indigo">
              <Users size={24} />
            </div>
            <p className="action-title">Consumos</p>
            <p className="action-subtitle">Por médico</p>
          </button>

          <button 
            onClick={() => setCurrentScreen('inventario')}
            className="action-card action-gray"
          >
            <div className="action-icon action-icon-gray">
              <Package size={24} />
            </div>
            <p className="action-title">Inventario</p>
            <p className="action-subtitle">Ver productos</p>
          </button>
        </div>

        <div className="info-card info-amber">
          <h3 className="info-title">
            <Calendar size={16} />
            Próximos a Vencer - {selectedSede}
          </h3>
          {vencimientoProximo.filter(v => v.sede === selectedSede).map((item, idx) => (
            <div key={idx} className="info-item">
              • {item.product} - Lote {item.lote} ({item.dias} días)
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Pantalla de Inventario Completo
  const InventarioScreen = () => (
    <div className="app-container">
      <div className={`header ${userProfile === 'asistente' ? 'header-purple' : 'header-blue'}`}>
        <div className="header-nav">
          <button onClick={() => setCurrentScreen('dashboard')} className="back-button">
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="header-title">Inventario Completo</h1>
            <p className="header-subtitle">Todos los productos</p>
          </div>
        </div>
      </div>

      <div className="content-wrapper">
        <div className="search-card">
          <div className="search-input-wrapper">
            <Search size={16} className="search-icon" />
            <input
              type="text"
              placeholder="Buscar producto..."
              className="search-input"
            />
          </div>
        </div>

        <div className="card-list">
          {inventarioCompleto.map(item => (
            <div 
              key={item.id} 
              onClick={() => {
                setSelectedProduct(item);
                setCurrentScreen('detalle-producto');
              }}
              className="product-card"
            >
              <div className="product-info-row">
                <div className="product-info">
                  <p className="product-name">{item.name}</p>
                  <p className="product-details">{item.category} • {item.sede}</p>
                  <p className="product-details">Lote: {item.lote} • Vence: {item.vencimiento}</p>
                </div>
                <div className="product-stock">
                  <p className={`stock-number ${item.stock < item.minStock ? 'text-red' : 'text-green'}`}>
                    {item.stock}
                  </p>
                  <p className="stock-label">Min: {item.minStock}</p>
                </div>
              </div>
              {item.stock < item.minStock && (
                <div className="badge badge-orange badge-with-icon">
                  <AlertCircle size={12} />
                  Stock bajo
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Pantalla de Detalle de Producto
  const DetalleProductoScreen = () => {
    if (!selectedProduct) return null;
    
    return (
      <div className="app-container">
        <div className={`header ${userProfile === 'asistente' ? 'header-purple' : 'header-blue'}`}>
          <div className="header-nav">
            <button onClick={() => setCurrentScreen('inventario')} className="back-button">
              <ArrowLeft size={20} />
            </button>
            <div>
              <h1 className="header-title">Detalle del Producto</h1>
              <p className="header-subtitle">{selectedProduct.name}</p>
            </div>
          </div>
        </div>

        <div className="content-wrapper">
          <div className="card">
            <h3 className="detail-section-title">Información General</h3>
            <div className="detail-list">
              <div className="detail-row">
                <span className="detail-label">Nombre:</span>
                <span className="detail-value">{selectedProduct.name}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Categoría:</span>
                <span className="detail-value">{selectedProduct.category}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Sede:</span>
                <span className="detail-value">{selectedProduct.sede}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Lote:</span>
                <span className="detail-value">{selectedProduct.lote}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Vencimiento:</span>
                <span className="detail-value">{selectedProduct.vencimiento}</span>
              </div>
            </div>
          </div>

          <div className="card">
            <h3 className="detail-section-title">Stock</h3>
            <div className="detail-list">
              <div className="detail-row">
                <span className="detail-label">Stock Actual:</span>
                <span className={`detail-value-large ${selectedProduct.stock < selectedProduct.minStock ? 'text-red' : 'text-green'}`}>
                  {selectedProduct.stock}
                </span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Stock Mínimo:</span>
                <span className="detail-value">{selectedProduct.minStock}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Precio Unitario:</span>
                <span className="detail-value">${selectedProduct.precio.toFixed(2)}</span>
              </div>
              <div className="detail-row">
                <span className="detail-label">Valor Total:</span>
                <span className="detail-value-large text-blue">${(selectedProduct.stock * selectedProduct.precio).toFixed(2)}</span>
              </div>
            </div>
          </div>

          {selectedProduct.stock < selectedProduct.minStock && (
            <div className="info-card info-orange">
              <p className="info-warning">
                <AlertCircle size={16} />
                <strong>Alerta:</strong> El stock está por debajo del mínimo
              </p>
            </div>
          )}
        </div>
      </div>
    );
  };

  // Pantalla de Log de Auditoría
  const LogAuditoriaScreen = () => {
    const logEntries = [
      { id: 1, usuario: 'Carlos Méndez', accion: 'Recepción', detalle: 'Amoxicilina 500mg - 50 unidades', fecha: '15/12/2025', hora: '10:30' },
      { id: 2, usuario: 'Dr. Juan Pérez', accion: 'Consumo', detalle: 'Suero Fisiológico - 500ml', fecha: '15/12/2025', hora: '11:15' },
      { id: 3, usuario: 'María González', accion: 'Aprobación Baja', detalle: 'Jeringa 10ml - 5 unidades', fecha: '15/12/2025', hora: '12:00' },
      { id: 4, usuario: 'Carlos Méndez', accion: 'Transferencia', detalle: 'Matriz → Urdesa: Antiparasitario - 20 unidades', fecha: '14/12/2025', hora: '16:30' },
      { id: 5, usuario: 'María González', accion: 'Conteo', detalle: 'Vitamina B12 - Diferencia: -2', fecha: '14/12/2025', hora: '15:00' }
    ];

    return (
      <div className="app-container">
        <div className="header header-purple">
          <div className="header-nav">
            <button onClick={() => setCurrentScreen('dashboard')} className="back-button">
              <ArrowLeft size={20} />
            </button>
            <div>
              <h1 className="header-title">Log de Auditoría</h1>
              <p className="header-subtitle">Trazabilidad completa</p>
            </div>
          </div>
        </div>

        <div className="content-wrapper">
          {logEntries.map(entry => (
            <div key={entry.id} className="log-card">
              <div className="log-content">
                <div className="log-info">
                  <div className="log-badge">
                    <span className="badge badge-purple">{entry.accion}</span>
                  </div>
                  <p className="log-detail">{entry.detalle}</p>
                  <p className="log-meta">Por: {entry.usuario}</p>
                </div>
              </div>
              <div className="log-footer">
                <div className="log-timestamp">
                  <Calendar size={12} />
                  <span>{entry.fecha}</span>
                </div>
                <div className="log-timestamp">
                  <Clock size={12} />
                  <span>{entry.hora}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  // Pantalla de Bajas Pendientes
  const BajasPendientesScreen = () => (
    <div className="app-container">
      <div className="header header-purple">
        <div className="header-nav">
          <button onClick={() => setCurrentScreen('dashboard')} className="back-button">
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="header-title">Solicitudes de Baja</h1>
            <p className="header-subtitle">Pendientes de aprobación</p>
          </div>
        </div>
      </div>

      <div className="content-wrapper">
        {pendingBajas.map(baja => (
          <div key={baja.id} className="baja-card">
            <div className="baja-header">
              <div className="baja-info">
                <p className="baja-product">{baja.product}</p>
                <p className="baja-quantity">{baja.quantity}</p>
                <div className="baja-badges">
                  <span className="badge badge-red">{baja.reason}</span>
                </div>
              </div>
              <div className="baja-amount">
                <p className="amount-value">${baja.amount}</p>
              </div>
            </div>
            
            <div className="baja-details">
              <div className="baja-detail-row">
                <span className="detail-label-small">Solicitado por:</span>
                <span className="detail-value-small">{baja.requestedBy}</span>
              </div>
              <div className="baja-detail-row">
                <span className="detail-label-small">Fecha:</span>
                <span className="detail-value-small">{baja.date}</span>
              </div>
              <div className="baja-evidence">
                <Camera size={16} className="text-gray" />
                <span className="evidence-text">✓ Evidencia fotográfica adjunta</span>
              </div>
            </div>

            <div className="button-group">
              <button 
                onClick={() => alert('Baja aprobada exitosamente')}
                className="btn btn-success btn-action"
              >
                <CheckCircle size={16} />
                Aprobar
              </button>
              <button 
                onClick={() => alert('Baja rechazada')}
                className="btn btn-danger btn-action"
              >
                <XCircle size={16} />
                Rechazar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Pantalla de Consumos Médicos
  const ConsumosMedicosScreen = () => (
    <div className="app-container">
      <div className={`header ${userProfile === 'asistente' ? 'header-indigo' : 'header-blue'}`}>
        <div className="header-nav">
          <button onClick={() => setCurrentScreen('dashboard')} className="back-button">
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="header-title">Consumos Médicos</h1>
            <p className="header-subtitle">Validación de consumos ordinarios</p>
          </div>
        </div>
        
        <div className="tabs-container">
          <button className="tab-button tab-active">
            Pendientes ({consumosMedicos.filter(c => !c.autorizado).length})
          </button>
          <button className="tab-button tab-inactive">
            Confirmados ({consumosMedicos.filter(c => c.autorizado).length})
          </button>
        </div>
      </div>

      <div className="content-wrapper">
        <div className={`info-card ${userProfile === 'asistente' ? 'info-indigo' : 'info-blue'}`}>
          <p className="info-text">
            <AlertCircle size={16} />
            Confirma que los consumos registrados por los médicos coincidan con los procedimientos realizados
          </p>
        </div>

        <div className="card-list">
          {consumosMedicos.map(consumo => (
            <div key={consumo.id} className={`consumo-card ${consumo.autorizado ? 'consumo-confirmed' : 'consumo-pending'}`}>
              <div className="consumo-header">
                <div className="consumo-info">
                  <div className="consumo-title-row">
                    <p className="consumo-medico">{consumo.medico}</p>
                    {consumo.autorizado ? (
                      <span className="badge badge-green-check">✓ Confirmado</span>
                    ) : (
                      <span className="badge badge-yellow">⏳ Pendiente</span>
                    )}
                  </div>
                  <p className="consumo-producto">{consumo.producto}</p>
                  <p className="consumo-paciente">Paciente: {consumo.paciente}</p>
                  <p className="consumo-procedimiento">
                    <strong>Procedimiento:</strong> {consumo.procedimiento}
                  </p>
                </div>
                <div className="consumo-cantidad">
                  <p className="cantidad-value">{consumo.cantidad}</p>
                </div>
              </div>
              <div className="consumo-footer">
                <div className="consumo-timestamp">
                  <Calendar size={12} />
                  <span>{consumo.fecha}</span>
                </div>
                <div className="consumo-timestamp">
                  <Clock size={12} />
                  <span>{consumo.hora}</span>
                </div>
              </div>
              {!consumo.autorizado && (
                <div className="button-group">
                  <button 
                    onClick={() => alert('Consumo confirmado. El inventario se ha actualizado automáticamente.')}
                    className="btn btn-success btn-action"
                  >
                    <CheckCircle size={16} />
                    Confirmar Consumo
                  </button>
                  <button 
                    onClick={() => alert('Consumo rechazado. Se notificará al médico para corrección.')}
                    className="btn btn-danger btn-action"
                  >
                    <XCircle size={16} />
                    Rechazar
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Pantalla de Recepción
  const RecepcionScreen = () => (
    <div className="app-container">
      <div className="header header-blue">
        <div className="header-nav">
          <button onClick={() => setCurrentScreen('dashboard')} className="back-button">
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="header-title">Recepción de Mercadería</h1>
            <p className="header-subtitle">Registrar ingreso</p>
          </div>
        </div>
      </div>

      <div className="content-wrapper-scroll">
        <div className="info-card info-blue">
          <p className="info-text">
            <AlertCircle size={16} />
            Lote y Vencimiento son obligatorios para cada producto
          </p>
        </div>

        <div className="form-card">
          <h3 className="form-title">Información General</h3>
          
          <div className="form-group">
            <label className="form-label">Proveedor *</label>
            <select
              className="form-select"
              value={recepcionData.proveedor}
              onChange={(e) => setRecepcionData({...recepcionData, proveedor: e.target.value})}
            >
              <option value="">Seleccionar proveedor...</option>
              {proveedores.map((p, idx) => (
                <option key={idx} value={p}>{p}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">N° Factura *</label>
            <input
              type="text"
              placeholder="Ej: 001-001-000123456"
              className="form-input"
              value={recepcionData.factura}
              onChange={(e) => setRecepcionData({...recepcionData, factura: e.target.value})}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Foto de Factura *</label>
            <div className="upload-box">
              {recepcionData.foto ? (
                <div className="upload-success">
                  <div className="upload-icon-success">
                    <Check size={24} />
                  </div>
                  <p className="upload-text-success">Foto cargada</p>
                  <button 
                    onClick={() => setRecepcionData({...recepcionData, foto: false})}
                    className="upload-remove"
                  >
                    Eliminar
                  </button>
                </div>
              ) : (
                <div className="upload-empty">
                  <Camera size={32} className="upload-icon" />
                  <button
                    onClick={() => setRecepcionData({...recepcionData, foto: true})}
                    className="upload-button"
                  >
                    Tomar/Subir Foto
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>

        {recepcionData.productos.length > 0 && (
          <div className="form-card">
            <h3 className="form-title">
              Productos Agregados ({recepcionData.productos.length})
            </h3>
            <div className="productos-list">
              {recepcionData.productos.map((prod, idx) => (
                <div key={idx} className="producto-item">
                  <div className="producto-item-content">
                    <div className="producto-item-info">
                      <p className="producto-item-name">{prod.producto}</p>
                      <p className="producto-item-detail">Cantidad: {prod.cantidad}</p>
                      <p className="producto-item-detail">Lote: {prod.lote} • Vence: {prod.vencimiento}</p>
                    </div>
                    <button
                      onClick={() => {
                        const nuevosProductos = recepcionData.productos.filter((_, i) => i !== idx);
                        setRecepcionData({...recepcionData, productos: nuevosProductos});
                      }}
                      className="remove-button"
                    >
                      <X size={20} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="form-card form-card-highlight">
          <h3 className="form-title-icon">
            <Plus size={16} />
            Agregar Producto
          </h3>
          
          <div className="form-group">
            <label className="form-label">Producto *</label>
            <select
              className="form-select"
              value={productoTempRecepcion.producto}
              onChange={(e) => setProductoTempRecepcion({...productoTempRecepcion, producto: e.target.value})}
            >
              <option value="">Seleccionar producto...</option>
              {products.map((p) => (
                <option key={p.id} value={p.name}>{p.name}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Cantidad *</label>
            <input
              type="number"
              placeholder="0"
              className="form-input"
              value={productoTempRecepcion.cantidad}
              onChange={(e) => setProductoTempRecepcion({...productoTempRecepcion, cantidad: e.target.value})}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Lote *</label>
            <input
              type="text"
              placeholder="Ej: L2024-001"
              className="form-input"
              value={productoTempRecepcion.lote}
              onChange={(e) => setProductoTempRecepcion({...productoTempRecepcion, lote: e.target.value})}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Fecha de Vencimiento *</label>
            <input
              type="date"
              className="form-input"
              value={productoTempRecepcion.vencimiento}
              onChange={(e) => setProductoTempRecepcion({...productoTempRecepcion, vencimiento: e.target.value})}
            />
          </div>

          <button
            onClick={() => {
              if (productoTempRecepcion.producto && productoTempRecepcion.cantidad && 
                  productoTempRecepcion.lote && productoTempRecepcion.vencimiento) {
                setRecepcionData({
                  ...recepcionData,
                  productos: [...recepcionData.productos, {...productoTempRecepcion}]
                });
                setProductoTempRecepcion({producto: '', cantidad: '', lote: '', vencimiento: ''});
              } else {
                alert('Complete todos los campos del producto');
              }
            }}
            className="btn btn-blue btn-full-action"
          >
            <Plus size={16} />
            Agregar Producto
          </button>
        </div>
      </div>

      <div className="footer-action">
        <button
          onClick={() => {
            if (recepcionData.proveedor && recepcionData.factura && recepcionData.foto && recepcionData.productos.length > 0) {
              setCurrentScreen('recepcion-confirmacion');
            } else {
              alert('Complete la información general y agregue al menos un producto');
            }
          }}
          className="btn btn-blue btn-footer"
        >
          Registrar Recepción ({recepcionData.productos.length} productos)
        </button>
      </div>
    </div>
  );

  // Pantalla de Confirmación de Recepción
  const RecepcionConfirmacionScreen = () => (
    <div className="confirmation-container">
      <div className="confirmation-card">
        <div className="confirmation-icon-success">
          <Check size={40} />
        </div>
        <h2 className="confirmation-title">¡Recepción Registrada!</h2>
        <p className="confirmation-text">La mercadería ha sido ingresada al sistema correctamente.</p>
        
        <div className="confirmation-summary">
          <p className="summary-title">Resumen:</p>
          <p className="summary-item">Proveedor: {recepcionData.proveedor}</p>
          <p className="summary-item">Factura: {recepcionData.factura}</p>
          <div className="summary-divider"></div>
          <p className="summary-subtitle">Productos recibidos:</p>
          {recepcionData.productos.map((prod, idx) => (
            <div key={idx} className="summary-product">
              <p className="summary-product-name">{prod.producto}</p>
              <p className="summary-product-detail">Cantidad: {prod.cantidad}</p>
              <p className="summary-product-detail">Lote: {prod.lote}</p>
            </div>
          ))}
          <p className="summary-total">Total: {recepcionData.productos.length} productos</p>
        </div>

        <button
          onClick={() => {
            setRecepcionData({proveedor: '', factura: '', foto: false, productos: []});
            setProductoTempRecepcion({producto: '', cantidad: '', lote: '', vencimiento: ''});
            setCurrentScreen('dashboard');
          }}
          className="btn btn-blue btn-footer"
        >
          Volver al Inicio
        </button>
      </div>
    </div>
  );

  // Pantalla de Transferencias
  const TransferenciasScreen = () => (
    <div className="app-container">
      <div className="header header-orange">
        <div className="header-nav">
          <button onClick={() => setCurrentScreen('dashboard')} className="back-button">
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="header-title">Transferencias</h1>
            <p className="header-subtitle">Entre sedes</p>
          </div>
        </div>
      </div>

      <div className="content-wrapper-scroll">
        <div className="info-card info-orange">
          <p className="info-text">
            <AlertCircle size={16} />
            El destino debe recibir la transferencia en la app
          </p>
        </div>

        <div className="form-card">
          <h3 className="form-title">Información de Transferencia</h3>
          
          <div className="form-grid">
            <div className="form-group">
              <label className="form-label">Origen *</label>
              <select
                className="form-select"
                value={transferenciaData.origen}
                onChange={(e) => setTransferenciaData({...transferenciaData, origen: e.target.value})}
              >
                <option value="Matriz">Matriz</option>
                <option value="Urdesa">Urdesa</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Destino *</label>
              <select
                className="form-select"
                value={transferenciaData.destino}
                onChange={(e) => setTransferenciaData({...transferenciaData, destino: e.target.value})}
              >
                <option value="Urdesa">Urdesa</option>
                <option value="Matriz">Matriz</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Motivo</label>
            <textarea
              placeholder="Razón de la transferencia..."
              rows="3"
              className="form-textarea"
              value={transferenciaData.motivo}
              onChange={(e) => setTransferenciaData({...transferenciaData, motivo: e.target.value})}
            />
          </div>
        </div>

        {transferenciaData.productos.length > 0 && (
          <div className="form-card">
            <h3 className="form-title">
              Productos a Transferir ({transferenciaData.productos.length})
            </h3>
            <div className="productos-list">
              {transferenciaData.productos.map((prod, idx) => (
                <div key={idx} className="producto-item">
                  <div className="producto-item-content">
                    <div className="producto-item-info">
                      <p className="producto-item-name">{prod.producto}</p>
                      <p className="producto-item-detail">Cantidad: {prod.cantidad}</p>
                    </div>
                    <button
                      onClick={() => {
                        const nuevosProductos = transferenciaData.productos.filter((_, i) => i !== idx);
                        setTransferenciaData({...transferenciaData, productos: nuevosProductos});
                      }}
                      className="remove-button"
                    >
                      <X size={20} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="form-card form-card-highlight-orange">
          <h3 className="form-title-icon">
            <Plus size={16} />
            Agregar Producto
          </h3>
          
          <div className="form-group">
            <label className="form-label">Producto *</label>
            <select
              className="form-select"
              value={productoTempTransferencia.producto}
              onChange={(e) => setProductoTempTransferencia({...productoTempTransferencia, producto: e.target.value})}
            >
              <option value="">Seleccionar producto...</option>
              {products.map((p) => (
                <option key={p.id} value={p.name}>{p.name}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Cantidad *</label>
            <input
              type="number"
              placeholder="0"
              className="form-input"
              value={productoTempTransferencia.cantidad}
              onChange={(e) => setProductoTempTransferencia({...productoTempTransferencia, cantidad: e.target.value})}
            />
          </div>

          <button
            onClick={() => {
              if (productoTempTransferencia.producto && productoTempTransferencia.cantidad) {
                setTransferenciaData({
                  ...transferenciaData,
                  productos: [...transferenciaData.productos, {...productoTempTransferencia}]
                });
                setProductoTempTransferencia({producto: '', cantidad: ''});
              } else {
                alert('Complete todos los campos del producto');
              }
            }}
            className="btn btn-orange btn-full-action"
          >
            <Plus size={16} />
            Agregar Producto
          </button>
        </div>
      </div>

      <div className="footer-action">
        <button
          onClick={() => {
            if (transferenciaData.productos.length > 0) {
              setCurrentScreen('transferencia-confirmacion');
            } else {
              alert('Agregue al menos un producto');
            }
          }}
          className="btn btn-orange btn-footer"
        >
          Crear Transferencia ({transferenciaData.productos.length} productos)
        </button>
      </div>
    </div>
  );

  // Pantalla de Confirmación de Transferencia
  const TransferenciaConfirmacionScreen = () => (
    <div className="confirmation-container">
      <div className="confirmation-card">
        <div className="confirmation-icon-orange">
          <Check size={40} />
        </div>
        <h2 className="confirmation-title">¡Transferencia Creada!</h2>
        <p className="confirmation-text">Los productos están en tránsito. El destino debe recibir la transferencia.</p>
        
        <div className="confirmation-summary">
          <p className="summary-title">Resumen:</p>
          <p className="summary-item">{transferenciaData.origen} → {transferenciaData.destino}</p>
          <div className="summary-divider"></div>
          <p className="summary-subtitle">Productos:</p>
          {transferenciaData.productos.map((prod, idx) => (
            <div key={idx} className="summary-product">
              <p className="summary-product-name">{prod.producto}</p>
              <p className="summary-product-detail">Cantidad: {prod.cantidad}</p>
            </div>
          ))}
          <p className="summary-total-orange">Total: {transferenciaData.productos.length} productos</p>
        </div>

        <button
          onClick={() => {
            setTransferenciaData({origen: 'Matriz', destino: 'Urdesa', motivo: '', productos: []});
            setProductoTempTransferencia({producto: '', cantidad: ''});
            setCurrentScreen('dashboard');
          }}
          className="btn btn-orange btn-footer"
        >
          Volver al Inicio
        </button>
      </div>
    </div>
  );

  // Pantalla de Conteos
  const ConteosScreen = () => (
    <div className="app-container">
      <div className="header header-green">
        <div className="header-nav">
          <button onClick={() => setCurrentScreen('dashboard')} className="back-button">
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="header-title">Conteo de Inventario</h1>
            <p className="header-subtitle">Verificación física</p>
          </div>
        </div>
      </div>

      <div className="content-wrapper-scroll">
        <div className="info-card info-green">
          <p className="info-text">
            <AlertCircle size={16} />
            Registra el conteo físico para comparar con el sistema
          </p>
        </div>

        {conteoData.productos.length > 0 && (
          <div className="form-card">
            <h3 className="form-title">
              Productos Contados ({conteoData.productos.length})
            </h3>
            <div className="productos-list">
              {conteoData.productos.map((prod, idx) => (
                <div key={idx} className={`conteo-item ${
                  prod.diferencia === 0 ? 'conteo-correcto' :
                  prod.diferencia > 0 ? 'conteo-sobrante' :
                  'conteo-faltante'
                }`}>
                  <div className="producto-item-content">
                    <div className="producto-item-info">
                      <p className="producto-item-name">{prod.producto}</p>
                      <p className="producto-item-detail">Sistema: {prod.stockSistema} | Físico: {prod.stockFisico}</p>
                      <p className={`conteo-diferencia ${
                        prod.diferencia === 0 ? 'text-green' :
                        prod.diferencia > 0 ? 'text-blue' : 'text-red'
                      }`}>
                        Diferencia: {prod.diferencia > 0 ? '+' : ''}{prod.diferencia}
                      </p>
                    </div>
                    <button
                      onClick={() => {
                        const nuevosProductos = conteoData.productos.filter((_, i) => i !== idx);
                        setConteoData({...conteoData, productos: nuevosProductos});
                      }}
                      className="remove-button"
                    >
                      <X size={20} />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        <div className="form-card form-card-highlight-green">
          <h3 className="form-title-icon">
            <Plus size={16} />
            Contar Producto
          </h3>
          
          <div className="form-group">
            <label className="form-label">Producto *</label>
            <select
              className="form-select"
              value={productoTempConteo.producto}
              onChange={(e) => {
                const prod = products.find(p => p.name === e.target.value);
                setProductoTempConteo({
                  ...productoTempConteo, 
                  producto: e.target.value,
                  stockSistema: prod?.stock || 0,
                  stockFisico: '',
                  diferencia: 0
                });
              }}
            >
              <option value="">Seleccionar producto...</option>
              {products.map((p) => (
                <option key={p.id} value={p.name}>{p.name}</option>
              ))}
            </select>
          </div>

          {productoTempConteo.producto && (
            <>
              <div className="stock-display">
                <p className="stock-display-label">Stock en Sistema:</p>
                <p className="stock-display-value text-blue">{productoTempConteo.stockSistema}</p>
              </div>

              <div className="form-group">
                <label className="form-label">Stock Físico Contado *</label>
                <input
                  type="number"
                  placeholder="Cantidad contada..."
                  className="form-input-large"
                  value={productoTempConteo.stockFisico}
                  onChange={(e) => {
                    const fisico = parseInt(e.target.value) || 0;
                    setProductoTempConteo({
                      ...productoTempConteo,
                      stockFisico: e.target.value,
                      diferencia: fisico - productoTempConteo.stockSistema
                    });
                  }}
                />
              </div>

              {productoTempConteo.stockFisico && (
                <div className={`diferencia-display ${
                  productoTempConteo.diferencia === 0 ? 'diferencia-correcto' :
                  productoTempConteo.diferencia > 0 ? 'diferencia-sobrante' :
                  'diferencia-faltante'
                }`}>
                  <p className="diferencia-label">Diferencia:</p>
                  <p className={`diferencia-value ${
                    productoTempConteo.diferencia === 0 ? 'text-green' :
                    productoTempConteo.diferencia > 0 ? 'text-blue' :
                    'text-red'
                  }`}>
                    {productoTempConteo.diferencia > 0 ? '+' : ''}{productoTempConteo.diferencia}
                  </p>
                  <p className="diferencia-message">
                    {productoTempConteo.diferencia === 0 ? '✓ Stock correcto' :
                     productoTempConteo.diferencia > 0 ? 'Sobrante detectado' :
                     'Faltante detectado'}
                  </p>
                </div>
              )}
            </>
          )}

          <button
            onClick={() => {
              if (productoTempConteo.producto && productoTempConteo.stockFisico !== '') {
                setConteoData({
                  ...conteoData,
                  productos: [...conteoData.productos, {...productoTempConteo}]
                });
                setProductoTempConteo({producto: '', stockSistema: 0, stockFisico: '', diferencia: 0});
              } else {
                alert('Complete todos los campos del producto');
              }
            }}
            className="btn btn-green btn-full-action"
          >
            <Plus size={16} />
            Agregar Conteo
          </button>
        </div>

        {conteoData.productos.length > 0 && (
          <div className="form-card">
            <label className="form-label">Foto de Evidencia *</label>
            <div className="upload-box">
              {conteoData.foto ? (
                <div className="upload-success">
                  <div className="upload-icon-success-large">
                    <Check size={32} />
                  </div>
                  <p className="upload-text-success">Foto cargada</p>
                  <button 
                    onClick={() => setConteoData({...conteoData, foto: false})}
                    className="upload-remove"
                  >
                    Eliminar
                  </button>
                </div>
              ) : (
                <div className="upload-empty">
                  <Camera size={48} className="upload-icon" />
                  <button
                    onClick={() => setConteoData({...conteoData, foto: true})}
                    className="upload-button"
                  >
                    Tomar Foto del Conteo
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      <div className="footer-action">
        <button
          onClick={() => {
            if (conteoData.productos.length > 0 && conteoData.foto) {
              setCurrentScreen('conteo-confirmacion');
            } else {
              alert('Agregue al menos un producto y suba la foto de evidencia');
            }
          }}
          className="btn btn-green btn-footer"
        >
          Guardar Conteo ({conteoData.productos.length} productos)
        </button>
      </div>
    </div>
  );

  // Pantalla de Confirmación de Conteo
  const ConteoConfirmacionScreen = () => (
    <div className="confirmation-container">
      <div className="confirmation-card">
        <div className="confirmation-icon-green">
          <Check size={40} />
        </div>
        <h2 className="confirmation-title">¡Conteo Registrado!</h2>
        <p className="confirmation-text">
          Se han registrado {conteoData.productos.length} productos en el conteo físico.
        </p>
        
        <div className="confirmation-summary confirmation-summary-scroll">
          <p className="summary-title">Resumen:</p>
          {conteoData.productos.map((prod, idx) => (
            <div key={idx} className="summary-product">
              <p className="summary-product-name">{prod.producto}</p>
              <p className="summary-product-detail">Sistema: {prod.stockSistema} | Físico: {prod.stockFisico}</p>
              <p className={`summary-product-detail ${
                prod.diferencia === 0 ? 'text-green' :
                prod.diferencia > 0 ? 'text-blue' : 'text-red'
              }`}>
                Diferencia: {prod.diferencia > 0 ? '+' : ''}{prod.diferencia}
              </p>
            </div>
          ))}
        </div>

        <button
          onClick={() => {
            setConteoData({foto: false, productos: []});
            setProductoTempConteo({producto: '', stockSistema: 0, stockFisico: '', diferencia: 0});
            setCurrentScreen('dashboard');
          }}
          className="btn btn-green btn-footer"
        >
          Volver al Inicio
        </button>
      </div>
    </div>
  );

  // Pantalla de Nuevo Producto
  const NuevoProductoScreen = () => (
    <div className="app-container">
      <div className="header header-purple">
        <div className="header-nav">
          <button onClick={() => setCurrentScreen('dashboard')} className="back-button">
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="header-title">Crear Nuevo Producto</h1>
            <p className="header-subtitle">Agregar al catálogo</p>
          </div>
        </div>
      </div>

      <div className="content-wrapper-scroll">
        <div className="form-card">
          <div className="form-group">
            <label className="form-label">Nombre del Producto *</label>
            <input
              type="text"
              placeholder="Ej: Amoxicilina 500mg"
              className="form-input"
              value={nuevoProductoData.nombre}
              onChange={(e) => setNuevoProductoData({...nuevoProductoData, nombre: e.target.value})}
            />
          </div>

          <div className="form-group">
            <label className="form-label">Categoría *</label>
            <select
              className="form-select"
              value={nuevoProductoData.categoria}
              onChange={(e) => setNuevoProductoData({...nuevoProductoData, categoria: e.target.value})}
            >
              <option value="">Seleccionar categoría...</option>
              {categorias.map((c, idx) => (
                <option key={idx} value={c}>{c}</option>
              ))}
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Stock Mínimo *</label>
            <input
              type="number"
              placeholder="0"
              className="form-input"
              value={nuevoProductoData.stockMinimo}
              onChange={(e) => setNuevoProductoData({...nuevoProductoData, stockMinimo: e.target.value})}
            />
          </div>

          <div className="form-grid">
            <div className="form-group">
              <label className="form-label">Precio Compra</label>
              <input
                type="number"
                step="0.01"
                placeholder="$0.00"
                className="form-input"
                value={nuevoProductoData.precioCompra}
                onChange={(e) => setNuevoProductoData({...nuevoProductoData, precioCompra: e.target.value})}
              />
            </div>

            <div className="form-group">
              <label className="form-label">Precio Venta</label>
              <input
                type="number"
                step="0.01"
                placeholder="$0.00"
                className="form-input"
                value={nuevoProductoData.precioVenta}
                onChange={(e) => setNuevoProductoData({...nuevoProductoData, precioVenta: e.target.value})}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="footer-action">
        <button
          onClick={() => {
            if (nuevoProductoData.nombre && nuevoProductoData.categoria && nuevoProductoData.stockMinimo) {
              setCurrentScreen('producto-confirmacion');
            } else {
              alert('Por favor complete los campos obligatorios');
            }
          }}
          className="btn btn-purple btn-footer"
        >
          Crear Producto
        </button>
      </div>
    </div>
  );

  // Pantalla de Confirmación de Producto
  const ProductoConfirmacionScreen = () => (
    <div className="confirmation-container">
      <div className="confirmation-card">
        <div className="confirmation-icon-purple">
          <Check size={40} />
        </div>
        <h2 className="confirmation-title">¡Producto Creado!</h2>
        <p className="confirmation-text">El producto ha sido agregado al catálogo exitosamente.</p>
        
        <div className="confirmation-summary">
          <p className="summary-title">Resumen:</p>
          <p className="summary-product-name">{nuevoProductoData.nombre}</p>
          <p className="summary-item">Categoría: {nuevoProductoData.categoria}</p>
          <p className="summary-item">Stock Mínimo: {nuevoProductoData.stockMinimo}</p>
        </div>

        <button
          onClick={() => {
            setNuevoProductoData({nombre: '', categoria: '', unidad: 'unidades', stockMinimo: '', precioCompra: '', precioVenta: ''});
            setCurrentScreen('dashboard');
          }}
          className="btn btn-purple btn-footer"
        >
          Volver al Inicio
        </button>
      </div>
    </div>
  );

  // Pantalla de Reportes
  const ReportesScreen = () => (
    <div className="app-container">
      <div className="header header-teal">
        <div className="header-nav">
          <button onClick={() => setCurrentScreen('dashboard')} className="back-button">
            <ArrowLeft size={20} />
          </button>
          <div>
            <h1 className="header-title">Reportes y Análisis</h1>
            <p className="header-subtitle">Información gerencial</p>
          </div>
        </div>
      </div>

      <div className="content-wrapper">
        <div className="reporte-card reporte-blue">
          <div className="reporte-content">
            <div className="reporte-icon-container">
              <BarChart3 size={32} className="reporte-icon" />
            </div>
            <div className="reporte-info">
              <p className="reporte-title">Movimientos de Inventario</p>
              <p className="reporte-subtitle">Entradas y salidas</p>
            </div>
          </div>
          <ChevronRight size={20} className="reporte-arrow" />
        </div>

        <div className="reporte-card reporte-purple">
          <div className="reporte-content">
            <div className="reporte-icon-container">
              <DollarSign size={32} className="reporte-icon" />
            </div>
            <div className="reporte-info">
              <p className="reporte-title">Valorización de Stock</p>
              <p className="reporte-subtitle">Por sede y categoría</p>
            </div>
          </div>
          <ChevronRight size={20} className="reporte-arrow" />
        </div>

        <div className="reporte-card reporte-green">
          <div className="reporte-content">
            <div className="reporte-icon-container">
              <TrendingUp size={32} className="reporte-icon" />
            </div>
            <div className="reporte-info">
              <p className="reporte-title">Rotación de Productos</p>
              <p className="reporte-subtitle">Análisis ABC</p>
            </div>
          </div>
          <ChevronRight size={20} className="reporte-arrow" />
        </div>

        <div 
          onClick={() => setCurrentScreen('consumos-medicos')}
          className="reporte-card reporte-orange"
        >
          <div className="reporte-content">
            <div className="reporte-icon-container">
              <Users size={32} className="reporte-icon" />
            </div>
            <div className="reporte-info">
              <p className="reporte-title">Consumo por Médico</p>
              <p className="reporte-subtitle">Análisis comparativo</p>
            </div>
          </div>
          <ChevronRight size={20} className="reporte-arrow" />
        </div>

        <div className="reporte-card reporte-red">
          <div className="reporte-content">
            <div className="reporte-icon-container">
              <AlertCircle size={32} className="reporte-icon" />
            </div>
            <div className="reporte-info">
              <p className="reporte-title">Bajas y Ajustes</p>
              <p className="reporte-subtitle">Historial completo</p>
            </div>
          </div>
          <ChevronRight size={20} className="reporte-arrow" />
        </div>

        <div className="reporte-card reporte-amber">
          <div className="reporte-content">
            <div className="reporte-icon-container">
              <Calendar size={32} className="reporte-icon" />
            </div>
            <div className="reporte-info">
              <p className="reporte-title">Productos por Vencer</p>
              <p className="reporte-subtitle">Próximos 90 días</p>
            </div>
          </div>
          <ChevronRight size={20} className="reporte-arrow" />
        </div>
      </div>
    </div>
  );

  const renderScreen = () => {
    switch(currentScreen) {
      case 'bajas-pendientes': return <BajasPendientesScreen />;
      case 'consumos-medicos': return <ConsumosMedicosScreen />;
      case 'recepcion': return <RecepcionScreen />;
      case 'recepcion-confirmacion': return <RecepcionConfirmacionScreen />;
      case 'transferencias': return <TransferenciasScreen />;
      case 'transferencia-confirmacion': return <TransferenciaConfirmacionScreen />;
      case 'conteos': return <ConteosScreen />;
      case 'conteo-confirmacion': return <ConteoConfirmacionScreen />;
      case 'crear-producto': return <NuevoProductoScreen />;
      case 'producto-confirmacion': return <ProductoConfirmacionScreen />;
      case 'reportes': return <ReportesScreen />;
      case 'inventario': return <InventarioScreen />;
      case 'detalle-producto': return <DetalleProductoScreen />;
      case 'log-auditoria': return <LogAuditoriaScreen />;
      default: return userProfile === 'asistente' ? <AsistenteDashboard /> : <AuxiliarDashboard />;
    }
  };

  return (
    <div className="app-wrapper">
      {renderScreen()}
    </div>
  );
}

export default App;