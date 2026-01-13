import React, { useState } from 'react';
import { 
  BarChart3, FileText, Users, Shield, Search, ChevronRight, Calendar, 
  Download, AlertTriangle, CheckCircle, XCircle, Clock, TrendingUp, 
  Package, Home, User, ArrowLeft, Mail, Phone, Activity, Filter 
} from 'lucide-react';
import './App.css';

function AuditoriaFlowSystem() {
  const [currentScreen, setCurrentScreen] = useState('dashboard');
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [selectedReport, setSelectedReport] = useState(null);
  const [selectedMovement, setSelectedMovement] = useState(null);
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedAlert, setSelectedAlert] = useState(null);
  const [filterType, setFilterType] = useState('all');
  const [dateRange, setDateRange] = useState('month');
  const [alertPriority, setAlertPriority] = useState('all');
  const [searchMovimiento, setSearchMovimiento] = useState('');
  const [searchUser, setSearchUser] = useState('');
  const [searchKardex, setSearchKardex] = useState('');

  const userName = "Lic. María Rodríguez";

  const movements = [
    { id: 1, type: 'Entrada', product: 'Amoxicilina 500mg', quantity: '50 unidades', user: 'Carlos Mendoza', role: 'Bodega', date: '15/12/2025', time: '10:30', status: 'approved', authorization: 'Admin: Juan López' },
    { id: 2, type: 'Consumo', product: 'Suero Fisiológico', quantity: '250 ml', user: 'Dr. Juan Pérez', role: 'Médico', date: '15/12/2025', time: '11:15', status: 'approved', authorization: 'Automático' },
    { id: 3, type: 'Baja', product: 'Jeringa 10ml', quantity: '5 unidades', user: 'Dr. Ana García', role: 'Médico', date: '15/12/2025', time: '14:20', status: 'pending', authorization: 'Pendiente revisión', value: 45.00, reason: 'Daño/Rotura' },
    { id: 4, type: 'Transferencia', product: 'Antiparasitario', quantity: '10 ml', user: 'Carlos Mendoza', role: 'Bodega', date: '14/12/2025', time: '16:45', status: 'approved', origin: 'Matriz - Ciudad Celeste', destination: 'Urdesa' },
    { id: 5, type: 'Ajuste', product: 'Vitamina B12', quantity: '-3 ml', user: 'Juan López', role: 'Admin', date: '14/12/2025', time: '09:30', status: 'approved', authorization: 'Admin: Juan López' },
    { id: 6, type: 'Baja', product: 'Equipo de Ultrasonido Portátil', quantity: '1 unidad', user: 'Dr. Juan Pérez', role: 'Médico', date: '14/12/2025', time: '15:00', status: 'pending', authorization: 'Requiere aprobación Gerencia', value: 850.00, reason: 'Daño irreparable', requiresManagement: true },
    { id: 7, type: 'Baja', product: 'Monitor de Signos Vitales', quantity: '1 unidad', user: 'Dr. Ana García', role: 'Médico', date: '13/12/2025', time: '11:20', status: 'pending', authorization: 'Requiere aprobación Gerencia', value: 1250.00, reason: 'Falla electrónica', requiresManagement: true }
  ];

  const [pendingApprovals, setPendingApprovals] = useState(
    movements.filter(m => m.type === 'Baja' && m.status === 'pending')
  );

  const [alerts, setAlerts] = useState([
    { id: 1, type: 'warning', title: 'Producto sin movimiento', description: 'Amoxicilina 250mg sin movimientos en 30 días', date: '15/12/2025', priority: 'media', resolved: false },
    { id: 2, type: 'critical', title: 'Stock bajo crítico', description: 'Suero Fisiológico por debajo del mínimo', date: '15/12/2025', priority: 'alta', resolved: false },
    { id: 3, type: 'info', title: 'Baja pendiente aprobación', description: '1 solicitud de baja requiere revisión', date: '15/12/2025', priority: 'media', resolved: false },
    { id: 4, type: 'warning', title: 'Movimiento fuera de horario', description: 'Registro de consumo a las 23:45 hrs', date: '14/12/2025', priority: 'baja', resolved: false }
  ]);

  const users = [
    { id: 1, name: 'Juan López', role: 'Administrador', email: 'juan.lopez@veterinaria.com', phone: '+593 99 123 4567', status: 'active', movements: 45, lastActivity: 'Hace 2 horas' },
    { id: 2, name: 'Carlos Mendoza', role: 'Bodega', email: 'carlos.mendoza@veterinaria.com', phone: '+593 99 234 5678', status: 'active', movements: 128, lastActivity: 'Hace 15 minutos' },
    { id: 3, name: 'Dr. Juan Pérez', role: 'Médico', email: 'juan.perez@veterinaria.com', phone: '+593 99 345 6789', status: 'active', movements: 89, lastActivity: 'Hace 30 minutos' },
    { id: 4, name: 'Dr. Ana García', role: 'Médico', email: 'ana.garcia@veterinaria.com', phone: '+593 99 456 7890', status: 'active', movements: 76, lastActivity: 'Hace 1 hora' },
    { id: 5, name: 'Lic. María Rodríguez', role: 'Auditoría', email: 'maria.rodriguez@veterinaria.com', phone: '+593 99 567 8901', status: 'active', movements: 12, lastActivity: 'Activo ahora' }
  ];

  const kardexProducts = [
    { id: 1, name: 'Amoxicilina 500mg', category: 'Antibióticos', stockActual: 145, stockMinimo: 50, ultimoMovimiento: '15/12/2025 10:30', valorUnitario: 0.85, valorTotal: 123.25, lote: 'L2024-001', vencimiento: '28/02/2026', sede: 'Matriz',
      movimientos: [
        { fecha: '15/12/2025', tipo: 'Entrada', cantidad: 50, saldo: 145, responsable: 'Carlos Mendoza' },
        { fecha: '14/12/2025', tipo: 'Consumo', cantidad: -5, saldo: 95, responsable: 'Dr. Juan Pérez' },
        { fecha: '13/12/2025', tipo: 'Entrada', cantidad: 100, saldo: 100, responsable: 'Carlos Mendoza' }
      ]
    },
    { id: 2, name: 'Suero Fisiológico', category: 'Soluciones', stockActual: 45, stockMinimo: 80, ultimoMovimiento: '15/12/2025 11:15', valorUnitario: 1.50, valorTotal: 67.50, lote: 'L2024-005', vencimiento: '20/08/2026', sede: 'Matriz', status: 'bajo',
      movimientos: [
        { fecha: '15/12/2025', tipo: 'Consumo', cantidad: -250, saldo: 45, responsable: 'Dr. Juan Pérez' },
        { fecha: '12/12/2025', tipo: 'Entrada', cantidad: 500, saldo: 295, responsable: 'Carlos Mendoza' }
      ]
    },
    { id: 3, name: 'Antiparasitario Canino', category: 'Antiparasitarios', stockActual: 28, stockMinimo: 50, ultimoMovimiento: '14/12/2025 16:45', valorUnitario: 12.50, valorTotal: 350.00, lote: 'L2024-002', vencimiento: '30/06/2026', sede: 'Matriz', status: 'bajo',
      movimientos: [
        { fecha: '14/12/2025', tipo: 'Transferencia', cantidad: -10, saldo: 28, responsable: 'Carlos Mendoza', destino: 'Urdesa' },
        { fecha: '10/12/2025', tipo: 'Entrada', cantidad: 38, saldo: 38, responsable: 'Carlos Mendoza' }
      ]
    },
    { id: 4, name: 'Vitamina B12', category: 'Vitaminas', stockActual: 82, stockMinimo: 30, ultimoMovimiento: '14/12/2025 09:30', valorUnitario: 3.20, valorTotal: 262.40, lote: 'L2024-003', vencimiento: '15/05/2026', sede: 'Urdesa',
      movimientos: [
        { fecha: '14/12/2025', tipo: 'Ajuste', cantidad: -3, saldo: 82, responsable: 'Juan López' },
        { fecha: '12/12/2025', tipo: 'Consumo', cantidad: -5, saldo: 85, responsable: 'Dra. Ana García' },
        { fecha: '08/12/2025', tipo: 'Entrada', cantidad: 90, saldo: 90, responsable: 'Carlos Mendoza' }
      ]
    },
    { id: 5, name: 'Jeringa 10ml', category: 'Material Médico', stockActual: 250, stockMinimo: 100, ultimoMovimiento: '15/12/2025 14:20', valorUnitario: 0.25, valorTotal: 62.50, lote: 'L2024-004', vencimiento: '31/12/2027', sede: 'Matriz',
      movimientos: [
        { fecha: '15/12/2025', tipo: 'Baja', cantidad: -5, saldo: 250, responsable: 'Dr. Ana García' },
        { fecha: '11/12/2025', tipo: 'Consumo', cantidad: -15, saldo: 255, responsable: 'Dr. Luis Mora' },
        { fecha: '09/12/2025', tipo: 'Entrada', cantidad: 270, saldo: 270, responsable: 'Carlos Mendoza' }
      ]
    }
  ];

  const reports = [
    { id: 1, name: 'Movimientos por Período', description: 'Todos los movimientos con trazabilidad completa', icon: FileText, color: 'blue' },
    { id: 2, name: 'Control de Usuarios', description: 'Actividad por usuario y roles', icon: Users, color: 'purple' },
    { id: 3, name: 'Análisis de Cumplimiento', description: 'Evaluación de controles COSO', icon: Shield, color: 'green' },
    { id: 4, name: 'Tendencias de Inventario', description: 'Análisis estadístico y proyecciones', icon: TrendingUp, color: 'orange' },
    { id: 5, name: 'Alertas y Anomalías', description: 'Detección de irregularidades', icon: AlertTriangle, color: 'red' },
    { id: 6, name: 'Kardex en Tiempo Real', description: 'Control de inventario valorizado por producto', icon: Package, color: 'teal' }
  ];

  const approveBaja = (bajaId) => {
    setPendingApprovals(pendingApprovals.map(baja => 
      baja.id === bajaId ? { ...baja, status: 'approved', authorization: `Aprobado por ${userName}` } : baja
    ));
  };

  const rejectBaja = (bajaId, reason) => {
    setPendingApprovals(pendingApprovals.map(baja => 
      baja.id === bajaId ? { ...baja, status: 'rejected', authorization: `Rechazado por ${userName}`, rejectionReason: reason } : baja
    ));
  };

  const markAlertResolved = (alertId) => {
    setAlerts(alerts.map(alert => 
      alert.id === alertId ? { ...alert, resolved: true } : alert
    ));
  };

  const filteredMovements = movements.filter(movement => {
    const matchesType = filterType === 'all' || movement.type === filterType;
    const matchesSearch = movement.product.toLowerCase().includes(searchMovimiento.toLowerCase()) ||
                         movement.user.toLowerCase().includes(searchMovimiento.toLowerCase());
    return matchesType && matchesSearch;
  });

  const filteredUsers = users.filter(user => 
    user.name.toLowerCase().includes(searchUser.toLowerCase()) ||
    user.role.toLowerCase().includes(searchUser.toLowerCase())
  );

  const filteredKardex = kardexProducts.filter(product =>
    product.name.toLowerCase().includes(searchKardex.toLowerCase()) ||
    product.category.toLowerCase().includes(searchKardex.toLowerCase())
  );

  const filteredAlerts = alerts.filter(alert => {
    if (alertPriority === 'all') return !alert.resolved;
    return alert.priority === alertPriority && !alert.resolved;
  });

  const DashboardScreen = () => (
    <div className="auditoria-container">
      <div className="auditoria-header">
        <div className="header-content">
          <div>
            <h1 className="header-title">Auditoría y Gerencia</h1>
            <p className="header-subtitle">Control y Supervisión</p>
          </div>
          <div className="avatar-circle">MR</div>
        </div>

        <div className="kpis-grid">
          <div className="kpi-card">
            <p className="kpi-number">{movements.length}</p>
            <p className="kpi-label">Movimientos</p>
          </div>
          <div className="kpi-card">
            <p className="kpi-number">97%</p>
            <p className="kpi-label">Cumplimiento</p>
          </div>
          <div className="kpi-card">
            <p className="kpi-number">3</p>
            <p className="kpi-label">Anomalías</p>
          </div>
          <div className="kpi-card">
            <p className="kpi-number">{alerts.filter(a => !a.resolved).length}</p>
            <p className="kpi-label">Alertas</p>
          </div>
        </div>
      </div>

      {alerts.filter(a => a.priority === 'alta' && !a.resolved).length > 0 && (
        <div className="alert-section">
          <div className="alert-critical">
            <AlertTriangle className="alert-icon" size={20} />
            <div className="alert-content-main">
              <p className="alert-title-bold">Atención Requerida</p>
              <p className="alert-description">
                {alerts.filter(a => a.priority === 'alta' && !a.resolved)[0].description}
              </p>
            </div>
          </div>
        </div>
      )}

      {pendingApprovals.filter(b => b.status === 'pending').length > 0 && (
        <div className="alert-section">
          <div className="alert-warning">
            <FileText className="alert-icon" size={20} />
            <div className="alert-content-main">
              <p className="alert-title-bold">
                {pendingApprovals.filter(b => b.status === 'pending').length} Solicitudes de Baja Pendientes
              </p>
              <p className="alert-description">
                {pendingApprovals.filter(b => b.requiresManagement).length} requieren aprobación de Gerencia
              </p>
              <button onClick={() => setCurrentScreen('aprobaciones')} className="alert-link-button">
                Revisar ahora →
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="actions-section">
        <h2 className="section-title">Acciones Rápidas</h2>
        
        <div className="actions-grid">
          <button onClick={() => setCurrentScreen('aprobaciones')} className="action-button action-yellow">
            {pendingApprovals.filter(b => b.status === 'pending').length > 0 && (
              <span className="notification-badge">
                {pendingApprovals.filter(b => b.status === 'pending').length}
              </span>
            )}
            <div className="action-icon action-icon-yellow">
              <CheckCircle size={20} />
            </div>
            <p className="action-title">Aprobaciones</p>
            <p className="action-subtitle">Bajas pendientes</p>
          </button>

          <button onClick={() => setCurrentScreen('movimientos')} className="action-button action-blue">
            <div className="action-icon action-icon-blue">
              <FileText size={20} />
            </div>
            <p className="action-title">Movimientos</p>
            <p className="action-subtitle">Trazabilidad</p>
          </button>

          <button onClick={() => setCurrentScreen('reportes')} className="action-button action-purple">
            <div className="action-icon action-icon-purple">
              <BarChart3 size={20} />
            </div>
            <p className="action-title">Reportes</p>
            <p className="action-subtitle">Análisis</p>
          </button>

          <button onClick={() => setCurrentScreen('alertas')} className="action-button action-orange">
            <div className="action-icon action-icon-orange">
              <AlertTriangle size={20} />
            </div>
            <p className="action-title">Alertas</p>
            <p className="action-subtitle">{alerts.filter(a => !a.resolved).length} activas</p>
          </button>

          <button onClick={() => setCurrentScreen('kardex')} className="action-button action-teal">
            <div className="action-icon action-icon-teal">
              <Package size={20} />
            </div>
            <p className="action-title">Kardex</p>
            <p className="action-subtitle">Tiempo real</p>
          </button>

          <button onClick={() => setCurrentScreen('usuarios')} className="action-button action-green">
            <div className="action-icon action-icon-green">
              <Users size={20} />
            </div>
            <p className="action-title">Usuarios</p>
            <p className="action-subtitle">Control</p>
          </button>
        </div>
      </div>

      <div className="activity-section">
        <div className="activity-header">
          <h2 className="section-title">Actividad Reciente</h2>
          <button onClick={() => setCurrentScreen('movimientos')} className="view-all-button">
            Ver todos
          </button>
        </div>
        
        <div className="activity-list">
          {movements.slice(0, 3).map(movement => (
            <div key={movement.id} className="activity-card">
              <div className="activity-card-content">
                <div className="activity-info">
                  <div className="activity-tags">
                    <span className={`type-badge type-${movement.type.toLowerCase()}`}>
                      {movement.type}
                    </span>
                    <span className={`status-dot status-${movement.status}`} />
                  </div>
                  <p className="activity-product">{movement.product}</p>
                  <p className="activity-user">{movement.user} ({movement.role})</p>
                </div>
                <div className="activity-quantity">
                  <p className="quantity-text">{movement.quantity}</p>
                  <p className="quantity-time">{movement.time}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bottom-nav">
        <button className="nav-button nav-active">
          <Home size={20} />
          <span>Inicio</span>
        </button>
        <button onClick={() => setCurrentScreen('movimientos')} className="nav-button">
          <FileText size={20} />
          <span>Movimientos</span>
        </button>
        <button onClick={() => setCurrentScreen('reportes')} className="nav-button">
          <BarChart3 size={20} />
          <span>Reportes</span>
        </button>
        <button className="nav-button">
          <User size={20} />
          <span>Perfil</span>
        </button>
      </div>
    </div>
  );

  const AprobacionesScreen = () => (
    <div className="screen-container">
      <div className="screen-header bg-yellow">
        <div className="header-nav">
          <button onClick={() => setCurrentScreen('dashboard')} className="back-button">
            <ArrowLeft size={20} />
          </button>
          <div className="header-info">
            <h1 className="screen-title">Aprobación de Bajas</h1>
            <p className="screen-subtitle">Solicitudes pendientes</p>
          </div>
          <div className="badge-count">
            {pendingApprovals.filter(b => b.status === 'pending').length}
          </div>
        </div>

        <div className="info-box">
          <p className="info-title">🔐 Nivel de Autorización</p>
          <p className="info-text">
            Bajas ≥ $100.00 requieren aprobación de Gerencia/Auditoría
          </p>
        </div>
      </div>

      <div className="screen-content">
        {pendingApprovals.filter(b => b.status === 'pending').map(baja => (
          <div
            key={baja.id}
            className={`baja-card ${baja.requiresManagement ? 'baja-critical' : 'baja-warning'}`}
          >
            <div className="baja-header">
              <div className="baja-info">
                <div className="baja-badges">
                  <span className="badge-red">BAJA</span>
                  {baja.requiresManagement && (
                    <span className="badge-purple">GERENCIA</span>
                  )}
                </div>
                <h3 className="baja-product">{baja.product}</h3>
                <p className="baja-user">
                  <span className="user-bold">{baja.user}</span> • {baja.role}
                </p>
              </div>
              <div className="baja-value">
                <p className="value-amount">${baja.value.toFixed(2)}</p>
                <p className="value-quantity">{baja.quantity}</p>
              </div>
            </div>

            <div className="baja-details">
              <div className="detail-row">
                <span className="detail-label">Motivo:</span>
                <span className="detail-text">{baja.reason}</span>
              </div>
            </div>

            {baja.requiresManagement && (
              <div className="baja-alert">
                <Shield className="alert-shield-icon" size={12} />
                <p className="alert-text">
                  <strong>Autorización Especial:</strong> Esta baja excede los $100.00
                </p>
              </div>
            )}

            <div className="baja-actions">
              <button 
                onClick={() => {
                  approveBaja(baja.id);
                  alert('Baja aprobada exitosamente');
                }}
                className="btn-approve"
              >
                Aprobar
              </button>
              <button 
                onClick={() => {
                  rejectBaja(baja.id, 'Revisión requerida');
                  alert('Baja rechazada');
                }}
                className="btn-reject"
              >
                Rechazar
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  const MovimientosScreen = () => (
    <div className="screen-container">
      <div className="screen-header bg-blue">
        <div className="header-nav">
          <button onClick={() => setCurrentScreen('dashboard')} className="back-button">
            <ArrowLeft size={20} />
          </button>
          <div className="header-info">
            <h1 className="screen-title">Registro de Movimientos</h1>
            <p className="screen-subtitle">Trazabilidad completa</p>
          </div>
        </div>

        <div className="filters-container">
          <div className="search-box">
            <Search className="search-icon" size={16} />
            <input
              type="text"
              placeholder="Buscar por producto, usuario..."
              value={searchMovimiento}
              onChange={(e) => setSearchMovimiento(e.target.value)}
              className="search-input"
            />
          </div>

          <div className="filters-row">
            <select value={filterType} onChange={(e) => setFilterType(e.target.value)} className="filter-select">
              <option value="all">Todos los tipos</option>
              <option value="Entrada">Entrada</option>
              <option value="Transferencia">Transferencia</option>
              <option value="Consumo">Consumo</option>
              <option value="Baja">Baja</option>
              <option value="Ajuste">Ajuste</option>
            </select>

            <select value={dateRange} onChange={(e) => setDateRange(e.target.value)} className="filter-select">
              <option value="today">Hoy</option>
              <option value="week">Esta semana</option>
              <option value="month">Este mes</option>
              <option value="year">Este año</option>
            </select>
          </div>
        </div>
      </div>

      <div className="screen-content">
        {filteredMovements.map(movement => (
          <div key={movement.id} className="movement-card">
            <div className="movement-header">
              <div className="movement-info">
                <div className="movement-badges">
                  <span className={`type-badge type-${movement.type.toLowerCase()}`}>
                    {movement.type}
                  </span>
                  {movement.status === 'approved' && <CheckCircle className="status-icon-success" size={16} />}
                  {movement.status === 'pending' && <Clock className="status-icon-warning" size={16} />}
                </div>
                <p className="movement-product">{movement.product}</p>
                <p className="movement-user">
                  <span className="user-name">{movement.user}</span> • {movement.role}
                </p>
                <div className="movement-meta">
                  <span className="meta-item">
                    <Calendar size={12} />
                    {movement.date}
                  </span>
                  <span className="meta-item">
                    <Clock size={12} />
                    {movement.time}
                  </span>
                </div>
              </div>
              <div className="movement-quantity">
                <p className="quantity-value">{movement.quantity}</p>
                <ChevronRight className="chevron-icon" size={20} />
              </div>
            </div>

            {movement.type === 'Baja' && movement.authorization && (
              <div className="movement-footer">
                <p className="authorization-text">
                  <span className="auth-label">Autorización:</span> {movement.authorization}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="screen-footer">
        <div className="footer-summary">
          <span className="summary-label">Total de movimientos</span>
          <span className="summary-value">{filteredMovements.length}</span>
        </div>
      </div>
    </div>
  );

  const ReportesScreen = () => (
    <div className="screen-container">
      <div className="screen-header bg-purple">
        <div className="header-nav">
          <button onClick={() => setCurrentScreen('dashboard')} className="back-button">
            <ArrowLeft size={20} />
          </button>
          <div className="header-info">
            <h1 className="screen-title">Reportes y Análisis</h1>
            <p className="screen-subtitle">Generación de informes</p>
          </div>
        </div>
      </div>

      <div className="screen-content">
        {reports.map(report => {
          const IconComponent = report.icon;
          return (
            <button
              key={report.id}
              onClick={() => {
                setSelectedReport(report);
                alert(`Configurando reporte: ${report.name}`);
              }}
              className="report-card"
            >
              <div className="report-content">
                <div className={`report-icon icon-${report.color}`}>
                  <IconComponent size={24} />
                </div>
                <div className="report-info">
                  <h3 className="report-title">{report.name}</h3>
                  <p className="report-description">{report.description}</p>
                </div>
                <ChevronRight className="chevron-icon" size={20} />
              </div>
            </button>
          );
        })}
      </div>

      <div className="screen-footer">
        <div className="info-footer">
          <p className="footer-info-text">
            💡 Los reportes incluyen análisis completo de controles COSO y trazabilidad de operaciones
          </p>
        </div>
      </div>
    </div>
  );

  const AlertasScreen = () => (
    <div className="screen-container">
      <div className="screen-header bg-orange">
        <div className="header-nav">
          <button onClick={() => setCurrentScreen('dashboard')} className="back-button">
            <ArrowLeft size={20} />
          </button>
          <div className="header-info">
            <h1 className="screen-title">Alertas y Control</h1>
            <p className="screen-subtitle">Detección de anomalías</p>
          </div>
          <div className="badge-count">
            {filteredAlerts.length}
          </div>
        </div>

        <div className="priority-filters">
          <button 
            onClick={() => setAlertPriority('all')}
            className={`priority-btn ${alertPriority === 'all' ? 'priority-active' : ''}`}
          >
            Todas
          </button>
          <button 
            onClick={() => setAlertPriority('alta')}
            className={`priority-btn ${alertPriority === 'alta' ? 'priority-active' : ''}`}
          >
            Alta
          </button>
          <button 
            onClick={() => setAlertPriority('media')}
            className={`priority-btn ${alertPriority === 'media' ? 'priority-active' : ''}`}
          >
            Media
          </button>
          <button 
            onClick={() => setAlertPriority('baja')}
            className={`priority-btn ${alertPriority === 'baja' ? 'priority-active' : ''}`}
          >
            Baja
          </button>
        </div>
      </div>

      <div className="screen-content">
        {filteredAlerts.length === 0 ? (
          <div className="empty-state">
            <CheckCircle className="empty-icon-success" size={48} />
            <p className="empty-text">No hay alertas activas</p>
            <p className="empty-subtext">¡Todo está en orden!</p>
          </div>
        ) : (
          filteredAlerts.map(alert => (
            <div
              key={alert.id}
              className={`alert-card alert-${alert.priority}`}
            >
              <div className="alert-card-content">
                <div className={`alert-card-icon icon-${alert.type}`}>
                  <AlertTriangle size={20} />
                </div>
                <div className="alert-card-info">
                  <div className="alert-card-header">
                    <h3 className="alert-card-title">{alert.title}</h3>
                    <span className={`priority-badge priority-${alert.priority}`}>
                      {alert.priority.toUpperCase()}
                    </span>
                  </div>
                  <p className="alert-card-description">{alert.description}</p>
                  <div className="alert-card-meta">
                    <Calendar size={12} />
                    <span>{alert.date}</span>
                  </div>
                </div>
              </div>

              <div className="alert-card-actions">
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    setSelectedAlert(alert);
                    // Aquí podrías agregar lógica para mostrar más detalles
                    alert(`Detalle de la alerta:\n\nTipo: ${alert.type}\nPrioridad: ${alert.priority}\nFecha: ${alert.date}\n\n${alert.description}`);
                  }}
                  className="btn-detail"
                >
                  Ver Detalle
                </button>
                <button 
                  onClick={(e) => {
                    e.stopPropagation();
                    markAlertResolved(alert.id);
                  }}
                  className="btn-resolve"
                >
                  Marcar Resuelta
                </button>
              </div>
            </div>
          ))
        )}
      </div>

      <div className="screen-footer">
        <div className="alert-summary">
          <div className="summary-item">
            <p className="summary-number text-red">
              {alerts.filter(a => a.priority === 'alta' && !a.resolved).length}
            </p>
            <p className="summary-text">Alta</p>
          </div>
          <div className="summary-item">
            <p className="summary-number text-yellow">
              {alerts.filter(a => a.priority === 'media' && !a.resolved).length}
            </p>
            <p className="summary-text">Media</p>
          </div>
          <div className="summary-item">
            <p className="summary-number text-blue">
              {alerts.filter(a => a.priority === 'baja' && !a.resolved).length}
            </p>
            <p className="summary-text">Baja</p>
          </div>
        </div>
      </div>
    </div>
  );

  const KardexScreen = () => (
    <div className="screen-container">
      <div className="screen-header bg-teal">
        <div className="header-nav">
          <button onClick={() => setCurrentScreen('dashboard')} className="back-button">
            <ArrowLeft size={20} />
          </button>
          <div className="header-info">
            <h1 className="screen-title">Kardex en Tiempo Real</h1>
            <p className="screen-subtitle">Control valorizado de inventario</p>
          </div>
          <button className="icon-button">
            <Download size={20} />
          </button>
        </div>

        <div className="search-box">
          <Search className="search-icon" size={16} />
          <input
            type="text"
            placeholder="Buscar producto..."
            value={searchKardex}
            onChange={(e) => setSearchKardex(e.target.value)}
            className="search-input"
          />
        </div>
      </div>

      <div className="kardex-summary">
        <div className="summary-card">
          <p className="summary-value-large text-teal">
            ${kardexProducts.reduce((acc, p) => acc + p.valorTotal, 0).toFixed(2)}
          </p>
          <p className="summary-label-small">Valor Total</p>
        </div>
        <div className="summary-card">
          <p className="summary-value-large text-blue">{kardexProducts.length}</p>
          <p className="summary-label-small">Productos</p>
        </div>
        <div className="summary-card">
          <p className="summary-value-large text-orange">
            {kardexProducts.filter(p => p.status === 'bajo').length}
          </p>
          <p className="summary-label-small">Stock Bajo</p>
        </div>
      </div>

      <div className="screen-content">
        {filteredKardex.length === 0 ? (
          <div className="empty-state">
            <Package className="empty-icon" size={48} />
            <p className="empty-text">No se encontraron productos</p>
          </div>
        ) : (
          filteredKardex.map(product => (
            <button
              key={product.id}
              onClick={() => {
                setSelectedProduct(product);
                setCurrentScreen('kardex-detalle');
              }}
              className="kardex-card"
            >
              <div className="kardex-header">
                <div className="kardex-info">
                  <div className="kardex-name-row">
                    <h3 className="kardex-name">{product.name}</h3>
                    {product.status === 'bajo' && (
                      <span className="badge-warning">Stock Bajo</span>
                    )}
                  </div>
                  <p className="kardex-category">{product.category} • {product.sede}</p>
                  <p className="kardex-lote">Lote: {product.lote} • Vence: {product.vencimiento}</p>
                </div>
                <ChevronRight className="chevron-icon" size={20} />
              </div>

              <div className="kardex-stats">
                <div className="stat-item">
                  <p className="stat-label">Stock</p>
                  <p className={`stat-value ${product.stockActual < product.stockMinimo ? 'text-orange' : 'text-teal'}`}>
                    {product.stockActual}
                  </p>
                  <p className="stat-sublabel">Min: {product.stockMinimo}</p>
                </div>
                <div className="stat-item">
                  <p className="stat-label">Valor Unit.</p>
                  <p className="stat-value-medium">${product.valorUnitario.toFixed(2)}</p>
                </div>
                <div className="stat-item">
                  <p className="stat-label">Valor Total</p>
                  <p className="stat-value-medium text-blue">${product.valorTotal.toFixed(2)}</p>
                </div>
              </div>

              <div className="kardex-footer">
                <Clock className="footer-icon" size={12} />
                <span className="footer-text">Último mov: {product.ultimoMovimiento}</span>
              </div>
            </button>
          ))
        )}
      </div>

      <div className="screen-footer">
        <div className="footer-summary">
          <span className="summary-label">Valor Total del Inventario</span>
          <span className="summary-value-highlight text-teal">
            ${filteredKardex.reduce((acc, p) => acc + p.valorTotal, 0).toFixed(2)}
          </span>
        </div>
      </div>
    </div>
  );

  const KardexDetalleScreen = () => {
    if (!selectedProduct) return null;

    return (
      <div className="screen-container">
        <div className="screen-header bg-teal">
          <div className="header-nav">
            <button onClick={() => setCurrentScreen('kardex')} className="back-button">
              <ArrowLeft size={20} />
            </button>
            <div className="header-info">
              <h1 className="screen-title">Kardex del Producto</h1>
              <p className="screen-subtitle">{selectedProduct.name}</p>
            </div>
            <button className="icon-button">
              <Download size={20} />
            </button>
          </div>
        </div>

        <div className="screen-content">
          <div className="detail-section">
            <div className="section-header">
              <h3 className="section-title-small">Información del Producto</h3>
            </div>
            <div className="section-content">
              <div className="detail-grid">
                <div className="detail-item">
                  <p className="detail-label">Nombre</p>
                  <p className="detail-value">{selectedProduct.name}</p>
                </div>
                <div className="detail-item">
                  <p className="detail-label">Categoría</p>
                  <p className="detail-value">{selectedProduct.category}</p>
                </div>
                <div className="detail-item">
                  <p className="detail-label">Lote</p>
                  <p className="detail-value">{selectedProduct.lote}</p>
                </div>
                <div className="detail-item">
                  <p className="detail-label">Vencimiento</p>
                  <p className="detail-value">{selectedProduct.vencimiento}</p>
                </div>
                <div className="detail-item">
                  <p className="detail-label">Sede</p>
                  <p className="detail-value">{selectedProduct.sede}</p>
                </div>
                <div className="detail-item">
                  <p className="detail-label">Último Movimiento</p>
                  <p className="detail-value-small">{selectedProduct.ultimoMovimiento}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="detail-section">
            <div className="section-header">
              <h3 className="section-title-small">Stock y Valorización</h3>
            </div>
            <div className="section-content">
              <div className="stock-cards">
                <div className="stock-card stock-card-teal">
                  <p className="stock-label">Stock Actual</p>
                  <p className={`stock-value ${selectedProduct.stockActual < selectedProduct.stockMinimo ? 'text-orange' : 'text-teal'}`}>
                    {selectedProduct.stockActual}
                  </p>
                  <p className="stock-sublabel">Mínimo: {selectedProduct.stockMinimo}</p>
                </div>
                <div className="stock-card stock-card-blue">
                  <p className="stock-label">Valor Total</p>
                  <p className="stock-value text-blue">
                    ${selectedProduct.valorTotal.toFixed(2)}
                  </p>
                  <p className="stock-sublabel">
                    Unit: ${selectedProduct.valorUnitario.toFixed(2)}
                  </p>
                </div>
              </div>

              {selectedProduct.stockActual < selectedProduct.stockMinimo && (
                <div className="stock-alert">
                  <AlertTriangle className="alert-icon-small" size={16} />
                  <p className="stock-alert-text">
                    <strong>Alerta:</strong> El stock está por debajo del mínimo establecido
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="detail-section">
            <div className="section-header">
              <h3 className="section-title-small">Historial de Movimientos</h3>
            </div>
            <div className="section-content">
              <div className="movimientos-list">
                {selectedProduct.movimientos.map((mov, idx) => (
                  <div key={idx} className="movimiento-item">
                    <div className="movimiento-content">
                      <div className="movimiento-info-detail">
                        <div className="movimiento-badges-detail">
                          <span className={`type-badge type-${mov.tipo.toLowerCase()}`}>
                            {mov.tipo}
                          </span>
                          <span className={`cantidad-badge ${mov.cantidad > 0 ? 'cantidad-positive' : 'cantidad-negative'}`}>
                            {mov.cantidad > 0 ? '+' : ''}{mov.cantidad}
                          </span>
                        </div>
                        <p className="movimiento-responsable">
                          Por: {mov.responsable}
                          {mov.destino && ` → ${mov.destino}`}
                        </p>
                      </div>
                      <div className="movimiento-saldo">
                        <p className="saldo-value">Saldo: {mov.saldo}</p>
                        <p className="saldo-fecha">{mov.fecha}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="screen-footer">
          <button className="btn-export">
            <Download size={20} />
            Exportar Kardex
          </button>
        </div>
      </div>
    );
  };

  const UsuariosScreen = () => (
    <div className="screen-container">
      <div className="screen-header bg-green">
        <div className="header-nav">
          <button onClick={() => setCurrentScreen('dashboard')} className="back-button">
            <ArrowLeft size={20} />
          </button>
          <div className="header-info">
            <h1 className="screen-title">Control de Usuarios</h1>
            <p className="screen-subtitle">Actividad y permisos</p>
          </div>
        </div>

        <div className="search-box">
          <Search className="search-icon" size={16} />
          <input
            type="text"
            placeholder="Buscar usuario..."
            value={searchUser}
            onChange={(e) => setSearchUser(e.target.value)}
            className="search-input"
          />
        </div>
      </div>

      <div className="screen-content">
        {filteredUsers.map(user => (
          <div key={user.id} className="user-card">
            <div className="user-card-header">
              <div className="user-avatar">{user.name.split(' ').map(n => n[0]).join('')}</div>
              <div className="user-info">
                <h3 className="user-name">{user.name}</h3>
                <p className="user-role">{user.role}</p>
                <div className="user-contact">
                  <div className="contact-item">
                    <Mail size={12} />
                    <span>{user.email}</span>
                  </div>
                  <div className="contact-item">
                    <Phone size={12} />
                    <span>{user.phone}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="user-stats">
              <div className="user-stat">
                <Clock size={16} className="stat-icon" />
                <div className="stat-info">
                  <p className="stat-value-activity">{user.lastActivity}</p>
                  <p className="stat-label">Última actividad</p>
                </div>
              </div>
            </div>

            <div className="user-footer">
              <span className={`status-indicator status-${user.status}`}>
                {user.status === 'active' ? 'Activo' : 'Inactivo'}
              </span>
              <button 
                onClick={() => alert(`Ver detalles de ${user.name}`)}
                className="btn-user-detail"
              >
                Ver detalles
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="screen-footer">
        <div className="footer-summary">
          <span className="summary-label">Total usuarios</span>
          <span className="summary-value">{filteredUsers.length}</span>
        </div>
      </div>
    </div>
  );

  const renderScreen = () => {
    switch(currentScreen) {
      case 'dashboard': return <DashboardScreen />;
      case 'aprobaciones': return <AprobacionesScreen />;
      case 'movimientos': return <MovimientosScreen />;
      case 'reportes': return <ReportesScreen />;
      case 'alertas': return <AlertasScreen />;
      case 'kardex': return <KardexScreen />;
      case 'kardex-detalle': return <KardexDetalleScreen />;
      case 'usuarios': return <UsuariosScreen />;
      default: return <DashboardScreen />;
    }
  };

  return (
    <div className="app-wrapper">
      <div className="mobile-container">
        {renderScreen()}
      </div>
    </div>
  );
}

export default AuditoriaFlowSystem;