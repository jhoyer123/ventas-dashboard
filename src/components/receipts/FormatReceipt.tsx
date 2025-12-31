import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Svg,
  Path,
  Font,
} from "@react-pdf/renderer";
import type { ReceiptData } from "@/types/receipt";

// Opcional: Registrar una fuente bonita (Google Fonts)
// Si no cargas esto, usará Helvetica por defecto.
Font.register({
  family: "Inter",
  src: "https://fonts.gstatic.com/s/inter/v12/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hjp-Ek-_EeA.ttf",
});

const themeColor = "#0369a1"; // Sky-700
const lightGray = "#f1f5f9"; // Slate-100

const styles = StyleSheet.create({
  page: {
    fontFamily: "Helvetica", // Cambiar a 'Inter' si registraste la fuente arriba
    fontSize: 10,
    paddingTop: 40,
    paddingLeft: 40,
    paddingRight: 40,
    paddingBottom: 0, // Sin padding abajo para el footer
    flexDirection: "column",
    backgroundColor: "#ffffff",
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  headerLeft: {
    flexDirection: "column",
  },
  title: {
    fontSize: 28,
    fontFamily: "Helvetica-Bold", // O Inter-Bold
    color: themeColor,
    textTransform: "uppercase",
  },
  subtitle: {
    fontSize: 10,
    color: "#64748b",
    marginTop: 4,
  },
  companyInfo: {
    textAlign: "right",
    fontSize: 9,
    color: "#475569",
  },
  companyName: {
    fontSize: 12,
    fontFamily: "Helvetica-Bold",
    color: "#1e293b",
    marginBottom: 2,
  },
  // La barra gris de información
  infoBar: {
    backgroundColor: lightGray,
    borderRadius: 6,
    padding: 12,
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
    borderColor: "#e2e8f0",
    borderWidth: 1,
  },
  infoCol: {
    flexDirection: "column",
  },
  label: {
    fontSize: 8,
    textTransform: "uppercase",
    color: "#64748b",
    marginBottom: 4,
    fontWeight: "bold",
  },
  value: {
    fontSize: 10,
    fontWeight: "bold",
    color: "#1e293b",
  },
  // Cliente
  clientSection: {
    marginBottom: 20,
    paddingLeft: 8,
    borderLeftWidth: 3,
    borderLeftColor: themeColor,
  },
  clientName: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 2,
  },
  // Tabla
  tableHeader: {
    flexDirection: "row",
    backgroundColor: themeColor,
    padding: 8,
    color: "white",
    fontSize: 9,
    fontWeight: "bold",
    borderRadius: 4,
  },
  tableRow: {
    flexDirection: "row",
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: "#e2e8f0",
  },
  colDesc: { width: "50%" },
  colPrice: { width: "15%", textAlign: "center" },
  colQty: { width: "15%", textAlign: "center" },
  colTotal: { width: "20%", textAlign: "right" },

  // Totales
  footerSection: {
    flexDirection: "row",
    marginTop: 20,
  },
  notesArea: {
    flex: 1,
    paddingRight: 20,
  },
  totalsArea: {
    width: 200,
  },
  totalRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 6,
    color: "#475569",
  },
  finalTotal: {
    flexDirection: "row",
    justifyContent: "space-between",
    backgroundColor: themeColor,
    color: "white",
    padding: 8,
    borderRadius: 4,
    marginTop: 6,
    alignItems: "center",
  },
  totalTextBig: {
    fontSize: 14,
    fontWeight: "bold",
  },
  // Decoración Footer
  waveContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 80,
    justifyContent: "flex-end",
  },
  footerText: {
    position: "absolute",
    bottom: 20,
    left: 0,
    right: 0,
    textAlign: "center",
    color: "#94a3b8",
    fontSize: 9,
  },
});

interface Props {
  data: ReceiptData;
}

export const FormatReceipt = ({ data }: Props) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerLeft}>
          <Text style={styles.title}>Nota de Venta</Text>
          <Text style={styles.subtitle}>
            Documento no válido para crédito fiscal
          </Text>
        </View>
        <View style={styles.companyInfo}>
          <Text style={styles.companyName}>MI EMPRESA S.R.L.</Text>
          <Text>Calle Comercio #123, Zona Central</Text>
          <Text>La Paz, Bolivia</Text>
          <Text>Tel: +591 600-12345</Text>
        </View>
      </View>

      {/* Info Bar */}
      <View style={styles.infoBar}>
        <View style={styles.infoCol}>
          <Text style={styles.label}>FECHA</Text>
          <Text style={styles.value}>
            {new Date(data.created_at).toLocaleDateString("es-BO")}
          </Text>
        </View>
        <View style={styles.infoCol}>
          <Text style={styles.label}>NRO. RECIBO</Text>
          <Text style={styles.value}>#{data.receiptNumber}</Text>
        </View>
        <View style={styles.infoCol}>
          <Text style={styles.label}>SUCURSAL</Text>
          <Text style={styles.value}>{data.branchName || "Principal"}</Text>
        </View>
        <View style={styles.infoCol}>
          <Text style={styles.label}>VENDEDOR</Text>
          <Text style={styles.value}>{data.userName || "Caja"}</Text>
        </View>
      </View>

      {/* Cliente */}
      <View style={styles.clientSection}>
        <Text style={styles.label}>SEÑOR(ES):</Text>
        <Text style={styles.clientName}>
          {data.clientName || "Consumidor Final"}
        </Text>
        {data.clientNit && (
          <Text style={{ fontSize: 10, color: "#475569" }}>
            NIT / CI: {data.clientNit}
          </Text>
        )}
      </View>

      {/* Tabla Items */}
      <View>
        <View style={styles.tableHeader}>
          <Text style={styles.colDesc}>DESCRIPCIÓN</Text>
          <Text style={styles.colPrice}>PRECIO UNIT.</Text>
          <Text style={styles.colQty}>CANT.</Text>
          <Text style={styles.colTotal}>TOTAL</Text>
        </View>

        {(data.items || []).map((item, index) => (
          <View
            key={index}
            style={[
              styles.tableRow,
              { backgroundColor: index % 2 === 0 ? "#ffffff" : "#f8fafc" },
            ]}
          >
            <Text style={styles.colDesc}>{item.name}</Text>
            <Text style={styles.colPrice}>Bs. {item.unitPrice.toFixed(2)}</Text>
            <Text style={styles.colQty}>{item.quantity}</Text>
            <Text style={styles.colTotal}>
              Bs. {(item.unitPrice * item.quantity).toFixed(2)}
            </Text>
          </View>
        ))}
      </View>

      {/* Footer: Notas y Totales */}
      <View style={styles.footerSection}>
        <View style={styles.notesArea}>
          <Text style={[styles.label, { marginBottom: 6 }]}>
            TÉRMINOS Y CONDICIONES
          </Text>
          <Text
            style={{
              fontSize: 8,
              color: "#64748b",
              lineHeight: 1.5,
              textAlign: "justify",
            }}
          >
            Gracias por su preferencia. Verifique su producto antes de
            retirarse. No se aceptan devoluciones pasadas las 24 horas. Forma de
            pago: {data.paymentMethod}.
          </Text>
        </View>

        <View style={styles.totalsArea}>
          <View style={styles.totalRow}>
            <Text>Subtotal</Text>
            <Text>Bs. {data.totalAmount.toFixed(2)}</Text>
          </View>
          {data.discountAmount! > 0 && (
            <View style={[styles.totalRow, { color: "#ef4444" }]}>
              <Text>Descuento</Text>
              <Text>- Bs. {data.discountAmount!.toFixed(2)}</Text>
            </View>
          )}
          <View style={styles.finalTotal}>
            <Text style={{ fontWeight: "bold" }}>TOTAL A PAGAR</Text>
            <Text style={styles.totalTextBig}>
              Bs. {data.finalAmount.toFixed(2)}
            </Text>
          </View>
          {data.debtAmount! > 0 && (
            <View style={{ marginTop: 5, alignItems: "flex-end" }}>
              <Text style={{ fontSize: 9, color: "#ea580c" }}>
                Saldo Pendiente: Bs. {data.debtAmount!.toFixed(2)}
              </Text>
            </View>
          )}
        </View>
      </View>

      {/* Decoración SVG (La onda genial al final) */}
      <View fixed style={styles.waveContainer}>
        <Svg
          viewBox="0 0 1440 320"
          width="600"
          height="150"
          style={{ color: "#f1f5f9" }}
        >
          <Path
            fill="#f1f5f9"
            d="M0,224L48,213.3C96,203,192,181,288,181.3C384,181,480,203,576,224C672,245,768,267,864,261.3C960,256,1056,224,1152,208C1248,192,1344,192,1392,192L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          />
        </Svg>
        <Text style={styles.footerText}>
          Gracias por su compra - MI EMPRESA S.R.L.
        </Text>
      </View>
    </Page>
  </Document>
);
