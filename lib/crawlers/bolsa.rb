require 'wombat'

states = {}

(2004..2016).each do |year|
  (1..2).each do |page|
    # puts page
    data = Wombat.crawl do
      base_url "http://www.portaldatransparencia.gov.br"

      if year < 2008
        path "/PortalTransparenciaPesquisaAcaoUF.asp?Exercicio=#{year}&textoPesquisa=&codigoAcao=006O&codigoFuncao=08&Ordem=0&Pagina=#{page}"
      else
        path "/PortalTransparenciaPesquisaAcaoUF.asp?codigoAcao=8442&codigoFuncao=08&NomeAcao=Transfer%EAncia+de+Renda+Diretamente+%E0s+Fam%EDlias+em+Condi%E7%E3o+de+Pobreza+e+Extrema+Pobreza+%28Lei+n%BA+10%2E836%2C+de+2004%29&Exercicio=#{year}&Pagina=#{page}"
      end

      states({ css: "#listagem a"}, :iterator) do
        name({ xpath: "text()" }, :text)
        href({ xpath: "./@href" })
      end
    end

    states[year] = [] unless states[year]
    states[year] << data["states"][2..100]
  end
end

puts states

# data["states"][2..100].each do |state|
#   puts "#{state.text} = #{state.href}"
# end
